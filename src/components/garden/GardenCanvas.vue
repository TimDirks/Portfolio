<script setup lang="ts">
interface Point {
    x: number;
    y: number;
}

export interface Drawing {
    path: string;
    color: string;
}

const props = defineProps({
    canvasSize: {
        type: Number,
        default: 200,
    },
});

const emit = defineEmits<{
    (event: 'artworkCreated', drawing: Drawing): void;
}>();

const AVAILABLE_COLORS = [
    '#ff7e00',
    '#00b7ef',
    '#990030',
    '#a8e61d',
    '#6f3198',
    '#ff2994',
    '#d3f9bc',
    '#ed1c24',
    '#22b14c',
    '#ffa3b1',
    '#fff200',
    '#2f3699',
];

const canvas = ref<HTMLCanvasElement>();
const context = ref<CanvasRenderingContext2D | null>();
const canvasBounds = ref<DOMRect | null>(null);
const curColor = ref<string>(AVAILABLE_COLORS[0]);
const drawStrokes = ref<Array<Array<Point>>>([[]]);

const cursorPosition: Point = {x: 0, y: 0};

// Determine if a drawing has been started by checking if there are strokes with more than 1 point.
const hasDrawing = computed(() => drawStrokes.value.some(stroke => stroke.length > 1));

function drawLine(ev: MouseEvent) {
    if (!context.value || !canvasBounds.value) {
        return;
    }

    // Mouse left button must be pressed
    if (ev.buttons !== 1) {
        return;
    }

    context.value.beginPath();

    context.value.lineWidth = 5;
    context.value.lineCap = 'round';
    context.value.strokeStyle = curColor.value;

    // Set the start position of the stroke segment.
    context.value.moveTo(cursorPosition.x, cursorPosition.y);

    // Update the position.
    updatePosition(ev);

    // Set the end position of the stroke segment.
    context.value.lineTo(cursorPosition.x, cursorPosition.y);

    // Draw stroke segment.
    context.value.stroke();
}

// Update cursor position from mouse event
function updatePosition(ev: MouseEvent) {
    // Set the cursor position by the mouse coordinates offset by the canvas bounds.
    cursorPosition.x = ev.clientX - canvasBounds.value!.left;
    cursorPosition.y = ev.clientY - canvasBounds.value!.top;

    // Get the latest (and thus current) stroke.
    const currentStroke = drawStrokes.value[drawStrokes.value.length - 1];

    // If the current stroke only has the start position, add the new position.
    if (currentStroke.length <= 1) {
        currentStroke.push({...cursorPosition});

        return;
    }

    // To optimize the stored data (and converted paths), we check whether the
    // newest point is inline with the last two points. To do this, we draw an
    // imaginary line between the second to last point and the newest point. Then
    // we calculate whether the last point would fall on that line. If that is the case,
    // the last point will become redundant and can be overwritten.
    const [pointA, pointB] = currentStroke.slice(-2);

    if (checkIfPointOnLine(pointA, cursorPosition, pointB)) {
        // If the point is on the line, overwrite the last coordinate entry.
        currentStroke.splice(-1, 1, {...cursorPosition});
    } else {
        // Otherwise add the new coordinate entry to the array.
        currentStroke.push({...cursorPosition});
    }
}

// Helper function to determine whether a point lies on a line.
function checkIfPointOnLine(start: Point, end: Point, point: Point) {
    // Normalize the start and end of our imaginary line to make offset calculation easier.
    const [lineStart, lineEnd] = start.x <= end.x
        ? [start, end]
        : [end, start];

    // Check whether the point coordinates are out of bounds of the line.
    if (
        point.x < lineStart.x
        || point.x > lineEnd.x
    ) {
        return false;
    }

    if (
        point.y < Math.min(lineStart.y, lineEnd.y)
        || point.y > Math.max(lineStart.y, lineEnd.y)
    ) {
        return false;
    }

    // Get the x and y deltas of the line.
    const dX = lineEnd.x - lineStart.x;
    const dY = lineEnd.y - lineStart.y;

    // If either dX or dY is 0, meaning the line is straight, the boundary check
    // is enough to determine if the point would be out of bounds.
    if (!dX || !dY) {
        return true;
    }

    // Calculate what the y coordinate would be of the point should it be the slope.
    const slope = dY / dX;
    const offset = lineStart.y - lineStart.x * slope;
    const calculatedY = point.x * slope + offset;

    // Check whether the calculated y coordinate matches that of the point (with some
    // error margin to account for floating point errors).
    return Math.abs(calculatedY - point.y) <= 0.1;
}

// Start a new stroke.
function startNewStroke(ev: MouseEvent) {
    if (!canvasBounds.value) {
        return;
    }

    // Set the cursor position by the mouse coordinates offset by the canvas bounds.
    cursorPosition.x = ev.clientX - canvasBounds.value.left;
    cursorPosition.y = ev.clientY - canvasBounds.value.top;

    // If the last item from the draw stroke array has more than 1 entry, add a new array
    // to store coordinates for the new stroke.
    if (!drawStrokes.value[drawStrokes.value.length - 1] || drawStrokes.value[drawStrokes.value.length - 1].length > 1) {
        drawStrokes.value.push([]);
    }

    // Set or update the first entry to the newest start coordinates.
    drawStrokes.value[drawStrokes.value.length - 1][0] = {...cursorPosition};
}

function selectColor(color: string) {
    // Don't allow color changes when a drawing has already been started.
    if (hasDrawing.value) {
        return;
    }

    curColor.value = color;
}

function clearCanvas() {
    if (!context.value) {
        return;
    }

    // Clear the canvas.
    context.value.clearRect(0, 0, props.canvasSize, props.canvasSize);

    // Clear the saved draw strokes.
    drawStrokes.value.splice(0, drawStrokes.value.length);

    // Reset the cursor position.
    cursorPosition.x = 0;
    cursorPosition.y = 0;
}

function convertStrokesToPath() {
    // Check if there are paths to convert by checking if there are
    // strokes with more than 1 coordinate saved.
    if (!hasDrawing.value) {
        return;
    }

    // Map the draw strokes by transforming them to SVG path instructions and then
    // mirroring them along the X, Y, and X and Y axis to create symmetry.
    const strokes = drawStrokes.value
        .filter(stroke => stroke.length > 1)
        .map((stroke) => {
            // To create a continuous line, every other path needs to draw the lines in
            // reverse order. This is so that the second line will continue where the first
            // line ended instead of it jumping to the original start on the mirrored side.
            const [start, ...points] = stroke;
            const [end, ...revPoints] = stroke.toReversed();

            const topLeftPath = [
                // Normal path as drawn on canvas. Will always be the first path.
                `M${start.x} ${start.y}`,
                ...points.map(({x, y}) => `L${x} ${y}`),
            ];

            const topRightPath = [
                // Path mirrored along the Y axis. Will be either second or last path.
                `L${props.canvasSize * 2 - end.x} ${end.y}`,
                ...revPoints.map(({x, y}) => `L${props.canvasSize * 2 - x} ${y}`),
            ];

            const bottomLeftPath = [
                // Path mirrored along the X axis. Will be either second or last path.
                `L${end.x} ${props.canvasSize * 2 - end.y}`,
                ...revPoints.map(({x, y}) => `L${x} ${props.canvasSize * 2 - y}`),
            ];

            const bottomRightPath = [
                // Path mirrored along both the X and Y axis. Will always be the third path.
                `L${props.canvasSize * 2 - start.x} ${props.canvasSize * 2 - start.y}`,
                ...points.map(({x, y}) => `L${props.canvasSize * 2 - x} ${props.canvasSize * 2 - y}`),
            ];

            // We check if the line was ended closer to the X or Y axis to determine which
            // way to order the top right and bottom left paths.
            const continueAlongX = end.x >= end.y;

            return [
                topLeftPath,
                continueAlongX ? topRightPath : bottomLeftPath,
                bottomRightPath,
                continueAlongX ? bottomLeftPath : topRightPath,
                'Z',
            ]
                .flat()
                .join('');
        });

    return strokes.join(' ');
}

function exportArtwork() {
    const path = convertStrokesToPath();

    if (!path) {
        return;
    }

    emit('artworkCreated', {path, color: curColor.value});
}

onMounted(() => {
    if (!canvas.value) {
        return;
    }

    context.value = canvas.value.getContext('2d');
    canvasBounds.value = canvas.value.getBoundingClientRect();
});
</script>

<template>
    <div class="flex items-center gap-8">
        <div class="flex items-center gap-2">
            <div
                v-hide-magic-cursor
                class="grid cursor-default grid-cols-2 gap-1"
            >
                <div
                    v-for="color in AVAILABLE_COLORS"
                    :key="`canvas-color-${color}`"
                    :class="[
                        color === curColor ? 'border-white' : 'border-transparent',
                        hasDrawing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                    ]"
                    :style="`background-color: ${color};`"
                    class="size-6 border-2 transition"
                    @click="selectColor(color)"
                />
            </div>

            <canvas
                ref="canvas"
                v-hide-magic-cursor
                :height="canvasSize"
                :width="canvasSize"
                class="cursor-default bg-white"
                @mousedown="startNewStroke"
                @mouseenter="startNewStroke"
                @mousemove="drawLine"
            />
        </div>

        <div class="flex flex-col gap-4">
            <UiButton
                :label="$t('garden.actions.clear')"
                @click="clearCanvas"
            />

            <UiButton
                :label="$t('garden.actions.plant')"
                @click="exportArtwork"
            />
        </div>
    </div>
</template>
