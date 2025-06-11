document.addEventListener("DOMContentLoaded", function () {
  // --- HELPER FUNCTION to get WebGL Renderer ---
  function getWebGLInfo() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        return "WebGL not supported";
      }
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return `${renderer} (${vendor})`;
      }
      return "Could not retrieve renderer info.";
    } catch (e) {
      return "protected";
    }
  }

  // --- HELPER FUNCTION to get Canvas Hash ---
  function getCanvasHash() {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText("!@#$<>&", 2, 15);
      const dataUrl = canvas.toDataURL();
      let hash = 0;
      for (let i = 0; i < dataUrl.length; i++) {
        const char = dataUrl.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return "0x" + Math.abs(hash).toString(16);
    } catch (e) {
      return "protected";
    }
  }

  // --- Populates all fingerprint data fields ---
  function populateFingerprintData() {
    const fpData = {
      userAgent: navigator.userAgent,
      resolution: `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      plugins: `${navigator.plugins.length} plugins`,
      canvas: getCanvasHash(),
      languages: navigator.languages
        ? navigator.languages.join(", ")
        : navigator.language,
      hardware: `${navigator.hardwareConcurrency || "N/A"} Cores, ${
        navigator.deviceMemory || "N/A"
      }GB RAM`,
      webgl: getWebGLInfo(),
    };

    document.getElementById("fp-user-agent").textContent = fpData.userAgent;
    document.getElementById("fpd-user-agent").textContent = fpData.userAgent;
    document.getElementById("fp-resolution").textContent = fpData.resolution;
    document.getElementById("fpd-resolution").textContent = fpData.resolution;
    document.getElementById("fp-timezone").textContent = fpData.timezone;
    document.getElementById("fpd-timezone").textContent = fpData.timezone;
    document.getElementById("fp-plugins").textContent = fpData.plugins;
    document.getElementById("fpd-plugins").textContent = fpData.plugins;
    document.getElementById("fp-canvas").textContent = fpData.canvas;
    document.getElementById("fpd-canvas").textContent = fpData.canvas;
    document.getElementById("fp-languages").textContent = fpData.languages;
    document.getElementById("fpd-languages").textContent = fpData.languages;
    document.getElementById("fp-hardware").textContent = fpData.hardware;
    document.getElementById("fpd-hardware").textContent = fpData.hardware;
    document.getElementById("fp-webgl").textContent = fpData.webgl;
    document.getElementById("fpd-webgl").textContent = fpData.webgl;
    document.getElementById("final-hash").textContent = fpData.canvas;
  }

  // --- HERO "DATA STREAM" ANIMATION (runs on load) ---
  function startDataStreamAnimation() {
    populateFingerprintData();
    document.body.style.overflow = "hidden";

    const tableRows = document.querySelectorAll("#analysis-table tr");
    tableRows.forEach((row) => row.classList.add("blurred-row"));

    const animationSteps = [
      { label: "User Agent", target: "row-user-agent", delay: 500 },
      { label: "Screen Geo", target: "row-resolution", delay: 1100 },
      { label: "Languages", target: "row-languages", delay: 1700 },
      { label: "Hardware", target: "row-hardware", delay: 2300 },
      { label: "Canvas Hash", target: "row-render", delay: 2900 },
      { label: "WebGL Info", target: "row-webgl", delay: 3500 },
      { label: "Plugin Map", target: "row-plugins", delay: 4100 },
      { label: "Timezone", target: "row-timezone", delay: 4700 },
    ];

    animationSteps.forEach((step) =>
      createAndAnimatePacket(step.label, step.target, step.delay)
    );

    const totalAnimationTime = 6200;
    setTimeout(() => {
      document.getElementById("hero-intro-title").style.display = "none";
      document.getElementById("analysis").style.display = "none";
      const finalContent = document.getElementById("hero-final-content");
      finalContent.style.display = "block";
      finalContent.style.animation = "fadeIn 1s ease-out";
      document.body.style.overflow = "auto";
    }, totalAnimationTime);
  }

  // --- Skips the hero animation if not at the top of the page ---
  function setupStaticPage() {
    populateFingerprintData();
    document.getElementById("hero-intro-title").style.display = "none";
    document.getElementById("analysis").style.display = "none";
    document.getElementById("hero-final-content").style.display = "block";
    document.querySelector("nav").style.animation = "none"; // Show nav instantly
  }

  function createAndAnimatePacket(label, targetRowId, delay) {
    setTimeout(() => {
      const packetContainer = document.getElementById("packet-container");
      const packet = document.createElement("div");
      packet.className = "data-packet";
      packet.textContent = `[${label}]`;
      packetContainer.appendChild(packet);
      const startPos = { x: 0, y: 0 };
      const side = Math.floor(Math.random() * 4);
      const vpWidth = window.innerWidth;
      const vpHeight = window.innerHeight;
      if (side === 0) {
        startPos.x = -100;
        startPos.y = Math.random() * vpHeight;
      } else if (side === 1) {
        startPos.x = vpWidth + 100;
        startPos.y = Math.random() * vpHeight;
      } else if (side === 2) {
        startPos.x = Math.random() * vpWidth;
        startPos.y = -100;
      } else {
        startPos.x = Math.random() * vpWidth;
        startPos.y = vpHeight + 100;
      }
      packet.style.left = `${startPos.x}px`;
      packet.style.top = `${startPos.y}px`;
      packet.style.opacity = "1";
      setTimeout(() => {
        packet.style.left = `${vpWidth / 2}px`;
        packet.style.top = `${vpHeight / 2}px`;
        packet.style.opacity = "0";
        packet.style.transform = "scale(0.5)";
      }, 50);
      setTimeout(() => {
        document.getElementById(targetRowId).classList.remove("blurred-row");
      }, 500);
      setTimeout(() => {
        packet.remove();
      }, 1500);
    }, delay);
  }

  // --- REBUILT: Turing Test Feature with Full Mobile Support ---
  function initializeTuringTestFeature() {
    const runBtn = document.getElementById("run-analysis-btn");
    const verdictBox = document.getElementById("verdict-box");

    let humanScore = 0,
      botScore = 0;

    // --- 1. Honeypot Setup ---
    let honeypotClicked = false;
    document.getElementById("honeypot").addEventListener("click", (e) => {
      e.preventDefault();
      honeypotClicked = true;
    });

    // --- 2. Drag and Drop (Mouse & Touch) - BUG FIXED ---
    const dragItem = document.getElementById("drag-item");
    const dropZone = document.getElementById("drop-zone");
    let dragChallengeCompleted = false;

    let isDragging = false;
    let initialX, initialY;

    function dragStart(e) {
      isDragging = true;
      dragItem.style.cursor = "grabbing";
      dragItem.style.transition = "none"; // Prevent transition during drag

      // Store the initial pointer position
      initialX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      initialY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

      // Add move and end listeners to the document
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("touchmove", dragMove, { passive: false });
      document.addEventListener("mouseup", dragEnd);
      document.addEventListener("touchend", dragEnd);
    }

    function dragMove(e) {
      if (!isDragging) return;
      e.preventDefault();

      // Calculate the distance moved from the start
      const currentX =
        e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const currentY =
        e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      const dx = currentX - initialX;
      const dy = currentY - initialY;

      // Apply translation
      dragItem.style.transform = `translate(${dx}px, ${dy}px)`;

      // Check for drop zone collision
      const dragRect = dragItem.getBoundingClientRect();
      const dropRect = dropZone.getBoundingClientRect();
      if (
        dragRect.left < dropRect.right &&
        dragRect.right > dropRect.left &&
        dragRect.top < dropRect.bottom &&
        dragRect.bottom > dropRect.top
      ) {
        dropZone.classList.add("drag-over");
      } else {
        dropZone.classList.remove("drag-over");
      }
    }

    function dragEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      dragItem.style.cursor = "grab";
      dragItem.style.transition = ""; // Restore transitions

      // Remove listeners from the document
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("touchmove", dragMove);
      document.removeEventListener("mouseup", dragEnd);
      document.removeEventListener("touchend", dragEnd);

      // Check for final drop position
      const dragRect = dragItem.getBoundingClientRect();
      const dropRect = dropZone.getBoundingClientRect();
      if (
        dragRect.left < dropRect.right &&
        dragRect.right > dropRect.left &&
        dragRect.top < dropRect.bottom &&
        dragRect.bottom > dropRect.top
      ) {
        dragChallengeCompleted = true;
        dropZone.classList.remove("drag-over");
        dropZone.classList.add("dropped");
        dropZone.querySelector("p").textContent = "Processing Complete";
        dragItem.style.display = "none";
      } else {
        // If not dropped on the zone, snap it back to the start
        dragItem.style.transform = "translate(0px, 0px)";
      }
    }

    // Attach only the start listeners initially
    dragItem.addEventListener("mousedown", dragStart);
    dragItem.addEventListener("touchstart", dragStart);

    // --- 3. Mouse/Touch Path Analysis ---
    const mouseBox = document.getElementById("mouse-box-feature");
    const canvas = document.getElementById("mouse-canvas-feature");
    const ctx = canvas.getContext("2d");
    let mousePath = [];
    let lastPos = null;
    let interactionClicks = 0;

    canvas.width = mouseBox.clientWidth;
    canvas.height = mouseBox.clientHeight;
    ctx.strokeStyle = `rgba(100, 255, 218, 0.5)`;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    function recordInteraction(e) {
      interactionClicks++;
    }

    function startPath(e) {
      e.preventDefault();
      const clientX =
        e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      const clientY =
        e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();
      lastPos = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        time: Date.now(),
      };
    }

    function drawPath(e) {
      if (!lastPos) return;
      e.preventDefault();

      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();

      const currentPos = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        time: Date.now(),
      };

      const deltaX = currentPos.x - lastPos.x;
      const deltaY = currentPos.y - lastPos.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const timeDiff = currentPos.time - lastPos.time;
      currentPos.speed = timeDiff > 0 ? distance / timeDiff : 0;
      mousePath.push(currentPos);

      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();

      lastPos = currentPos;
    }

    function endPath(e) {
      lastPos = null;
    }

    mouseBox.addEventListener("mousedown", (e) => {
      recordInteraction(e);
      startPath(e);
    });
    mouseBox.addEventListener("touchstart", (e) => {
      recordInteraction(e);
      startPath(e);
    });

    mouseBox.addEventListener("mousemove", drawPath);
    mouseBox.addEventListener("touchmove", drawPath);

    mouseBox.addEventListener("mouseup", endPath);
    mouseBox.addEventListener("touchend", endPath);
    mouseBox.addEventListener("mouseleave", endPath);

    // --- 4. Typing Cadence Analysis ---
    const typingInput = document.getElementById("typing-test-feature");
    let typingTimestamps = [];
    let backspaceCount = 0;
    let startTime = null;

    typingInput.addEventListener("paste", (e) => {
      e.preventDefault();
      botScore += 20;
    });
    typingInput.addEventListener("keydown", (e) => {
      if (!startTime) startTime = Date.now();

      if (e.key === "Backspace" || e.key === "Delete") {
        backspaceCount++;
      } else if (typingInput.value.length < "security".length) {
        typingTimestamps.push(Date.now());
      }
    });

    // --- 5. Run Analysis Button ---
    runBtn.addEventListener("click", () => {
      humanScore = 0;
      botScore = 0;

      // Analysis 1: Honeypot
      if (honeypotClicked) botScore += 100;

      // Analysis 2: Drag and Drop
      if (dragChallengeCompleted) {
        humanScore += 25;
        document.getElementById("verdict-drag").textContent =
          "Successful. (Human Indicator)";
      } else {
        botScore += 10;
        document.getElementById("verdict-drag").textContent =
          "Incomplete. (Bot Indicator)";
      }

      // Analysis 3: Mouse/Touch Path
      const speeds = mousePath.map((p) => p.speed).filter((s) => s > 0);
      let mouseVerdict = "";
      if (speeds.length < 5) {
        botScore += 15;
        mouseVerdict = "Minimal movement. (Bot Indicator)";
      } else {
        const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
        const speedStdDev = Math.sqrt(
          speeds.map((x) => Math.pow(x - avgSpeed, 2)).reduce((a, b) => a + b) /
            speeds.length
        );
        if (speedStdDev > 0.3) {
          humanScore += 25;
          mouseVerdict = `Organic. (Speed variance: ${speedStdDev.toFixed(2)})`;
        } else {
          botScore += 20;
          mouseVerdict = `Robotic. (Speed variance: ${speedStdDev.toFixed(2)})`;
        }
        if (interactionClicks > 0) humanScore += 10;
      }
      document.getElementById("verdict-mouse").textContent = mouseVerdict;

      // Analysis 4: Typing
      const typingIntervals = [];
      let typingVerdict = "";
      if (typingTimestamps.length > 2) {
        for (let i = 1; i < typingTimestamps.length; i++) {
          typingIntervals.push(typingTimestamps[i] - typingTimestamps[i - 1]);
        }
        const avgInterval =
          typingIntervals.reduce((a, b) => a + b, 0) / typingIntervals.length;
        const intervalStdDev = Math.sqrt(
          typingIntervals
            .map((x) => Math.pow(x - avgInterval, 2))
            .reduce((a, b) => a + b) / typingIntervals.length
        );

        if (intervalStdDev > 15) {
          humanScore += 25;
          typingVerdict = "Human-like cadence.";
        } else {
          botScore += 15;
          typingVerdict = "Metronomic cadence.";
        }
        if (backspaceCount > 0) humanScore += 15;
        if (typingInput.value.toLowerCase() !== "security") botScore += 10;
      } else {
        botScore += 20;
        typingVerdict = "No significant data.";
      }
      document.getElementById("verdict-typing").textContent = typingVerdict;

      // Visualize Typing Cadence
      const chartContainer = document.getElementById("typing-chart-container");
      chartContainer.innerHTML = "";
      if (typingIntervals.length > 0) {
        const maxInterval = Math.max(...typingIntervals, 1);
        typingIntervals.forEach((interval) => {
          const bar = document.createElement("div");
          bar.className = "typing-bar";
          bar.style.height = `${(interval / maxInterval) * 100}%`;
          bar.title = `${interval}ms`;
          chartContainer.appendChild(bar);
        });
      }

      // Final Conclusion
      const conclusion = document.getElementById("verdict-conclusion");
      if (botScore > 90) {
        conclusion.textContent =
          "High Probability of Bot Activity (Honeypot Triggered)";
        conclusion.style.color = "red";
      } else if (botScore > humanScore) {
        conclusion.textContent = "High Probability of Being Automated.";
        conclusion.style.color = "orange";
      } else {
        const probability = 50 + (humanScore - botScore);
        conclusion.textContent = `${Math.min(99, probability).toFixed(
          1
        )}% Probability of Being Human.`;
        conclusion.style.color = "var(--accent-color)";
      }

      verdictBox.style.display = "block";
      verdictBox.style.animation = "fadeIn 1s";
    });
  }

  function initializeMobileMenu() {
    const hamburgerBtn = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li a");

    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("is-open");
      hamburgerBtn.classList.toggle("is-open");
      if (navLinks.classList.contains("is-open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("is-open")) {
          navLinks.classList.remove("is-open");
          hamburgerBtn.classList.remove("is-open");
          document.body.style.overflow = "auto";
        }
      });
    });
  }

  // --- Initialize Everything ---
  if (window.scrollY === 0 && window.location.hash === "") {
    startDataStreamAnimation();
  } else {
    setupStaticPage();
  }

  initializeTuringTestFeature();
  initializeMobileMenu();
});
