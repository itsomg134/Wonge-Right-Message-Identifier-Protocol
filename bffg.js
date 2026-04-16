// script.js - Trapezium Theorem Explorer
// Handles canvas drawing, slider interactions, and theorem verification

(function() {
    // ======================== DOM Elements ========================
    const canvas = document.getElementById('trapeziumCanvas');
    const ctx = canvas.getContext('2d');
    
    // Sliders and value displays
    const topSlider = document.getElementById('topBaseSlider');
    const bottomSlider = document.getElementById('bottomBaseSlider');
    const heightSlider = document.getElementById('heightSlider');
    const topValSpan = document.getElementById('topVal');
    const bottomValSpan = document.getElementById('bottomVal');
    const heightValSpan = document.getElementById('heightVal');
    
    // Theorem verification elements
    const theoremValueSpan = document.getElementById('theoremValue');
    const actualMNSpan = document.getElementById('actualMN');
    const matchMsgSpan = document.getElementById('matchMsg');
    
    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    
    // ======================== Canvas Constants ========================
    const CANVAS_W = 500;
    const CANVAS_H = 320;
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    
    // Base Y coordinate for bottom base (distance from top)
    const BASE_Y_BOTTOM = CANVAS_H - 50;
    
    // Helper: Calculate Y coordinate of top base based on height
    function getTopY(heightPx) {
        return BASE_Y_BOTTOM - heightPx;
    }
    
    // ======================== State Variables ========================
    let topBaseLen = 80;      // pixels
    let bottomBaseLen = 180;  // pixels
    let heightPx = 150;       // pixels
    
    // ======================== Helper Functions ========================
    
    /**
     * Get the four vertices of the trapezium (centered, isosceles style)
     * Returns: { A, B, C, D } where:
     * A = bottom-left, B = bottom-right, C = top-right, D = top-left
     */
    function getVertices() {
        const centerX = CANVAS_W / 2;
        const halfBottom = bottomBaseLen / 2;
        const halfTop = topBaseLen / 2;
        const yTop = getTopY(heightPx);
        const yBottom = BASE_Y_BOTTOM;
        
        return {
            A: { x: centerX - halfBottom, y: yBottom },  // bottom-left
            B: { x: centerX + halfBottom, y: yBottom },  // bottom-right
            C: { x: centerX + halfTop, y: yTop },        // top-right
            D: { x: centerX - halfTop, y: yTop }         // top-left
        };
    }
    
    /**
     * Calculate the midpoints of the legs (AD and BC)
     * Returns: { M, N } where M is midpoint of left leg AD, N is midpoint of right leg BC
     */
    function getMidpoints(vertices) {
        const { A, B, C, D } = vertices;
        const M = { x: (A.x + D.x) / 2, y: (A.y + D.y) / 2 };
        const N = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
        return { M, N };
    }
    
    /**
     * Calculate Euclidean distance between two points
     */
    function distance(p1, p2) {
        return Math.hypot(p2.x - p1.x, p2.y - p1.y);
    }
    
    /**
     * Update theorem verification display by comparing actual midsegment length
     * with theoretical value (average of bases)
     */
    function verifyTheorem() {
        const vertices = getVertices();
        const { M, N } = getMidpoints(vertices);
        const actualLength = distance(M, N);
        const theoreticalLength = (topBaseLen + bottomBaseLen) / 2;
        
        theoremValueSpan.innerText = theoreticalLength.toFixed(2);
        actualMNSpan.innerText = actualLength.toFixed(2);
        
        // Allow small floating point tolerance
        const tolerance = 0.5;
        if (Math.abs(actualLength - theoreticalLength) <= tolerance) {
            matchMsgSpan.innerHTML = '✅ Theorem verified! MN = (a + b)/2';
            matchMsgSpan.style.color = '#1a6e58';
        } else {
            matchMsgSpan.innerHTML = '⚠️ Minor rounding deviation, but theorem holds mathematically.';
            matchMsgSpan.style.color = '#c96f0e';
        }
    }
    
    /**
     * Draw background grid for reference
     */
    function drawGrid() {
        ctx.save();
        ctx.strokeStyle = "#d4e2dc";
        ctx.lineWidth = 0.5;
        
        // Horizontal grid lines
        for (let y = 40; y < CANVAS_H; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(CANVAS_W, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let x = 40; x < CANVAS_W; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, CANVAS_H);
            ctx.stroke();
        }
        ctx.restore();
    }
    
    /**
     * Draw parallel markers (small arrows) on the bases
     */
    function drawParallelMarkers(vertices) {
        const { A, B, C, D } = vertices;
        ctx.save();
        ctx.strokeStyle = "#6e947f";
        ctx.lineWidth = 1.5;
        
        // Markers on top base (D to C)
        const topMidX = (D.x + C.x) / 2;
        const topY = D.y;
        ctx.beginPath();
        ctx.moveTo(topMidX - 15, topY - 3);
        ctx.lineTo(topMidX - 5, topY - 3);
        ctx.moveTo(topMidX + 5, topY - 3);
        ctx.lineTo(topMidX + 15, topY - 3);
        ctx.stroke();
        
        // Markers on bottom base (A to B)
        const bottomMidX = (A.x + B.x) / 2;
        const bottomY = A.y;
        ctx.beginPath();
        ctx.moveTo(bottomMidX - 15, bottomY - 3);
        ctx.lineTo(bottomMidX - 5, bottomY - 3);
        ctx.moveTo(bottomMidX + 5, bottomY - 3);
        ctx.lineTo(bottomMidX + 15, bottomY - 3);
        ctx.stroke();
        
        ctx.restore();
    }
    
    /**
     * Draw labels for vertices, bases, and midsegment
     */
    function drawLabels(vertices, midpoints) {
        const { A, B, C, D } = vertices;
        const { M, N } = midpoints;
        
        ctx.save();
        ctx.font = "500 12px 'Inter', sans-serif";
        ctx.fillStyle = "#1c5c4b";
        
        // Label bases with lengths
        const midBottomX = (A.x + B.x) / 2;
        const midTopX = (D.x + C.x) / 2;
        const yBottom = A.y;
        const yTop = D.y;
        
        ctx.fillText(`Base b = ${Math.round(bottomBaseLen)} px`, midBottomX - 35, yBottom + 18);
        ctx.fillText(`Base a = ${Math.round(topBaseLen)} px`, midTopX - 30, yTop - 8);
        
        // Label vertices
        ctx.fillStyle = "#2c5a6e";
        ctx.font = "600 11px 'Inter', sans-serif";
        ctx.fillText("A", A.x - 12, A.y + 4);
        ctx.fillText("B", B.x + 4, B.y + 4);
        ctx.fillText("C", C.x + 4, C.y - 4);
        ctx.fillText("D", D.x - 12, D.y - 4);
        
        // Label midpoints M and N
        ctx.fillStyle = "#e67e22";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText("M", M.x - 12, M.y - 4);
        ctx.fillText("N", N.x + 6, N.y - 4);
        
        // Label midsegment value near its center
        const midSegCenter = { x: (M.x + N.x) / 2, y: (M.y + N.y) / 2 - 12 };
        ctx.fillStyle = "#aa6f20";
        ctx.font = "500 11px 'Inter', sans-serif";
        const mnLength = distance(M, N).toFixed(1);
        ctx.fillText(`Midsegment = ${mnLength} px`, midSegCenter.x - 45, midSegCenter.y);
        
        ctx.restore();
    }
    
    /**
     * Draw the trapezium shape with fill and stroke
     */
    function drawTrapezium(vertices) {
        const { A, B, C, D } = vertices;
        
        // Fill the trapezium
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.lineTo(C.x, C.y);
        ctx.lineTo(D.x, D.y);
        ctx.closePath();
        ctx.fillStyle = "#cbe7de";
        ctx.fill();
        ctx.strokeStyle = "#2f6b5c";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        
        // Highlight bases with thicker stroke
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.strokeStyle = "#1d6f5c";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(D.x, D.y);
        ctx.lineTo(C.x, C.y);
        ctx.stroke();
        
        // Draw legs with medium stroke
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(D.x, D.y);
        ctx.strokeStyle = "#437c6e";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(B.x, B.y);
        ctx.lineTo(C.x, C.y);
        ctx.stroke();
    }
    
    /**
     * Draw the midsegment (orange line connecting M and N)
     */
    function drawMidsegment(midpoints) {
        const { M, N } = midpoints;
        ctx.beginPath();
        ctx.moveTo(M.x, M.y);
        ctx.lineTo(N.x, N.y);
        ctx.strokeStyle = "#f3a712";
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Draw circles at midpoints
        ctx.fillStyle = "#e67e22";
        ctx.beginPath();
        ctx.arc(M.x, M.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#f39c12";
        ctx.beginPath();
        ctx.arc(N.x, N.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    /**
     * Main drawing function - renders everything on canvas
     */
    function drawTrapeziumAndMidsegment() {
        // Clear canvas
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        
        // Draw background grid
        drawGrid();
        
        // Get current geometry
        const vertices = getVertices();
        const midpoints = getMidpoints(vertices);
        
        // Draw main shapes
        drawTrapezium(vertices);
        drawMidsegment(midpoints);
        drawParallelMarkers(vertices);
        drawLabels(vertices, midpoints);
    }
    
    // ======================== Update Functions ========================
    
    /**
     * Update all UI elements and redraw canvas based on current slider values
     */
    function updateFromSliders() {
        // Read values from sliders
        topBaseLen = parseFloat(topSlider.value);
        bottomBaseLen = parseFloat(bottomSlider.value);
        heightPx = parseFloat(heightSlider.value);
        
        // Update display spans
        topValSpan.innerText = Math.round(topBaseLen);
        bottomValSpan.innerText = Math.round(bottomBaseLen);
        heightValSpan.innerText = Math.round(heightPx);
        
        // Redraw canvas
        drawTrapeziumAndMidsegment();
        
        // Verify and display theorem
        verifyTheorem();
    }
    
    /**
     * Reset all sliders to their default classic shape values
     */
    function resetShape() {
        topSlider.value = "80";
        bottomSlider.value = "180";
        heightSlider.value = "150";
        updateFromSliders();
    }
    
    // ======================== Event Listeners ========================
    topSlider.addEventListener('input', updateFromSliders);
    bottomSlider.addEventListener('input', updateFromSliders);
    heightSlider.addEventListener('input', updateFromSliders);
    resetBtn.addEventListener('click', resetShape);
    
    // Handle window resize to maintain canvas aspect ratio and redraw
    window.addEventListener('resize', () => {
        drawTrapeziumAndMidsegment();
        verifyTheorem();
    });
    
    // ======================== Initialization ========================
    // Set initial values and draw
    updateFromSliders();
    
    // Optional: Add tooltip or console log to confirm script loaded
    console.log('Trapezium Theorem Explorer initialized successfully');
})();