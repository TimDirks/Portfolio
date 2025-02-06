<script setup lang="ts">
interface Point {
    x: number;
    y: number;
}

const props = defineProps({
    color: {
        type: String,
        default: '#c0392b',
    },
    size: {
        type: Number,
        default: 200,
    },
});

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

onMounted(() => {
    if (!canvas.value) {
        return;
    }

    context.value = canvas.value.getContext('2d');
    canvasBounds.value = canvas.value.getBoundingClientRect();
});
</script>

<template>
    <canvas
        ref="canvas"
        v-hide-magic-cursor
        :height="size"
        :width="size"
        class="cursor-default bg-white"
        @mousedown="startNewStroke"
        @mouseenter="startNewStroke"
        @mousemove="drawLine"
    />
</template>
