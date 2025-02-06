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
    color: {
        type: String,
        default: '#c0392b',
    },
});

const emit = defineEmits<{
    (event: 'artworkCreated', drawing: Drawing): void;
}>();

const canvas = ref<HTMLCanvasElement>();
const context = ref<CanvasRenderingContext2D | null>();
const canvasBounds = ref<DOMRect | null>(null);

const drawStrokes: Array<Array<Point>> = [[]];
const cursorPosition: Point = {x: 0, y: 0};

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
    context.value.strokeStyle = props.color;

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
    const currentStroke = drawStrokes[drawStrokes.length - 1];

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
    if (!drawStrokes[drawStrokes.length - 1] || drawStrokes[drawStrokes.length - 1].length > 1) {
        drawStrokes.push([]);
    }

    // Set or update the first entry to the newest start coordinates.
    drawStrokes[drawStrokes.length - 1][0] = {...cursorPosition};
}

function clearCanvas() {
    if (!context.value) {
        return;
    }

    // Clear the canvas.
    context.value.clearRect(0, 0, props.canvasSize, props.canvasSize);

    // Clear the saved draw strokes.
    drawStrokes.splice(0, drawStrokes.length);

    // Reset the cursor position.
    cursorPosition.x = 0;
    cursorPosition.y = 0;
}

function convertStrokesToPath() {
    // Check if there are paths to convert by checking if there are
    // strokes with more than 1 coordinate saved.
    if (!drawStrokes.some(stroke => stroke.length > 1)) {
        return;
    }

    // Map the draw strokes by transforming them to SVG path instructions and then
    // mirroring them along the X, Y, and X and Y axis to create symmetry.
    const strokes = drawStrokes
        .filter(stroke => stroke.length > 1)
        .map((stroke) => {
            // To create a continuous line, every other path needs to draw the lines in
            // reverse order. This is so that the second line will continue where the first
            // line ended instead of it jumping to the original start on the mirrored side.
            const [start, ...points] = stroke;
            const [end, ...revPoints] = stroke.toReversed();

            // TODO: Check which way the line is drawn in to figure out in which order to mirror the paths.

            return [
                // Normal path as drawn on canvas.
                `M${start.x} ${start.y}`,
                ...points.map(({x, y}) => `L${x} ${y}`),
                // Path mirrored along the Y axis.
                `L${props.canvasSize * 2 - end.x} ${end.y}`,
                ...revPoints.map(({x, y}) => `L${props.canvasSize * 2 - x} ${y}`),
                // Path mirrored along both the X and Y axis.
                `L${props.canvasSize * 2 - start.x} ${props.canvasSize * 2 - start.y}`,
                ...points.map(({x, y}) => `L${props.canvasSize * 2 - x} ${props.canvasSize * 2 - y}`),
                // Path mirrored along the X axis.
                `L${end.x} ${props.canvasSize * 2 - end.y}`,
                ...revPoints.map(({x, y}) => `L${x} ${props.canvasSize * 2 - y}`),
                'Z',
            ].join('');
        });

    return strokes.join(' ');
}

function exportArtwork() {
    const path = convertStrokesToPath();

    if (!path) {
        return;
    }

    emit('artworkCreated', {path, color: props.color});
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
