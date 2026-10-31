/**
 * Business Analysis Learning Lab - ANN Visualizer Module Logic
 * Interactive Neural Network Canvas, Forward Propagation pulse animation, and layer inspector
 */

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("ann-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Network Topology
  const layers = [
    { name: "Input Layer", count: 3, labels: ["X₁: Usia", "X₂: Frekuensi", "X₃: Riwayat Promo"], activation: "None (Raw Input)" },
    { name: "Hidden Layer 1", count: 4, labels: ["H₁₁", "H₁₂", "H₁₃", "H₁₄"], activation: "ReLU (max(0, z))" },
    { name: "Hidden Layer 2", count: 3, labels: ["H₂₁", "H₂₂", "H₂₃"], activation: "ReLU (max(0, z))" },
    { name: "Output Layer", count: 1, labels: ["Ŷ: Peluang Beli"], activation: "Sigmoid (1 / (1 + e⁻ᶻ))" }
  ];

  let nodes = [];
  let connections = [];
  let selectedNode = null;
  let animationStep = -1; // -1 = idle
  let animProgress = 0;

  function resizeAndInit() {
    canvas.width = canvas.parentElement.clientWidth || 800;
    canvas.height = 360;

    nodes = [];
    connections = [];

    const layerSpacing = canvas.width / (layers.length + 1);

    layers.forEach((layer, lIdx) => {
      const x = layerSpacing * (lIdx + 1);
      const verticalSpacing = canvas.height / (layer.count + 1);

      for (let nIdx = 0; nIdx < layer.count; nIdx++) {
        const y = verticalSpacing * (nIdx + 1);
        nodes.push({
          id: `${lIdx}_${nIdx}`,
          layerIndex: lIdx,
          nodeIndex: nIdx,
          x,
          y,
          radius: 20,
          label: layer.labels[nIdx],
          activation: layer.activation,
          layerName: layer.name,
          value: (Math.random() * 0.8 + 0.1).toFixed(2),
          bias: (Math.random() * 0.4 - 0.2).toFixed(2)
        });
      }
    });

    // Generate connections between consecutive layers
    for (let l = 0; l < layers.length - 1; l++) {
      const fromNodes = nodes.filter(n => n.layerIndex === l);
      const toNodes = nodes.filter(n => n.layerIndex === l + 1);

      fromNodes.forEach(fn => {
        toNodes.forEach(tn => {
          connections.push({
            from: fn,
            to: tn,
            weight: (Math.random() * 2 - 1).toFixed(2)
          });
        });
      });
    }

    selectedNode = nodes[0];
    updateInspector(selectedNode);
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Synapses
    connections.forEach(conn => {
      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);
      const w = parseFloat(conn.weight);
      ctx.strokeStyle = w > 0 ? `rgba(6, 182, 212, ${Math.abs(w) * 0.4 + 0.1})` : `rgba(244, 63, 94, ${Math.abs(w) * 0.4 + 0.1})`;
      ctx.lineWidth = Math.abs(w) * 2 + 0.8;
      ctx.stroke();
    });

    // Draw Forward Propagation Animated Pulses
    if (animationStep >= 0 && animationStep < layers.length - 1) {
      const activeConns = connections.filter(c => c.from.layerIndex === animationStep);
      activeConns.forEach(c => {
        const px = c.from.x + (c.to.x - c.from.x) * animProgress;
        const py = c.from.y + (c.to.y - c.from.y) * animProgress;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    // Draw Neurons
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      const isSelected = selectedNode && selectedNode.id === node.id;
      if (isSelected) {
        ctx.fillStyle = "rgba(99, 102, 241, 0.4)";
        ctx.strokeStyle = "#818cf8";
        ctx.lineWidth = 3;
      } else {
        ctx.fillStyle = node.layerIndex === 0 ? "#1e293b" : node.layerIndex === 3 ? "#065f46" : "#0f172a";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1.5;
      }

      ctx.fill();
      ctx.stroke();

      // Node label
      ctx.font = "10px Inter, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.label, node.x, node.y);
    });
  }

  function updateInspector(node) {
    if (!node) return;
    const nameEl = document.getElementById("ann-inspect-name");
    const layerEl = document.getElementById("ann-inspect-layer");
    const actEl = document.getElementById("ann-inspect-activation");
    const biasEl = document.getElementById("ann-inspect-bias");
    const valEl = document.getElementById("ann-inspect-value");

    if (nameEl) nameEl.textContent = `Neuron ${node.label}`;
    if (layerEl) layerEl.textContent = node.layerName;
    if (actEl) actEl.textContent = node.activation;
    if (biasEl) biasEl.textContent = `Bias (b): ${node.bias}`;
    if (valEl) valEl.textContent = `Nilai Sinyal Output: ${node.value}`;
  }

  // Click on canvas to select node
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    nodes.forEach(node => {
      const dist = Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2);
      if (dist <= node.radius) {
        selectedNode = node;
        updateInspector(node);
        draw();
      }
    });
  });

  // Forward Propagation Animation Trigger
  const btnAnimate = document.getElementById("btn-run-forward-pass");
  if (btnAnimate) {
    btnAnimate.addEventListener("click", () => {
      animationStep = 0;
      animProgress = 0;

      function stepAnimation() {
        animProgress += 0.05;
        if (animProgress >= 1) {
          animProgress = 0;
          animationStep++;
        }

        if (animationStep < layers.length - 1) {
          draw();
          requestAnimationFrame(stepAnimation);
        } else {
          animationStep = -1;
          const outputNode = nodes.find(n => n.layerIndex === 3);
          if (outputNode) {
            outputNode.value = (0.75 + Math.random() * 0.15).toFixed(2);
            updateInspector(outputNode);
          }
          draw();
          if (window.App) window.App.showToast("Forward propagation selesai! Peluang konversi dihitung. 🧠");
          if (window.ProgressManager) window.ProgressManager.markCompleted("ann");
        }
      }

      requestAnimationFrame(stepAnimation);
    });
  }

  window.addEventListener("resize", resizeAndInit);
  resizeAndInit();
});
