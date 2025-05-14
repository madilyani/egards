document.addEventListener("DOMContentLoaded", function () {
  // Mouse move parallax effect
  const heroContent = document.querySelector(".hero__inner-content");
  const parallaxImages = document.querySelectorAll(".heroItem");
  const cursor = document.querySelector(".cursor");

  let mouseX = 0,
    mouseY = 0;
  let contentX = 0,
    contentY = 0;
  let img1X = 0,
    img1Y = 0;
  let img2X = 0,
    img2Y = 0;
  let img3X = 0,
    img3Y = 0;
  let img4X = 0,
    img4Y = 0;
  const ease = 0.04;
  const imgEase = 0.05; // Images move faster than background

  function animate() {
    // Calculate difference between current and target position
    const dxContent = mouseX - contentX;
    const dyConten = mouseY - contentY;

    const dxImg1 = mouseX - img1X;
    const dyImg1 = mouseY - img1Y;

    const dxImg2 = mouseX - img2X;
    const dyImg2 = mouseY - img2Y;

    const dxImg3 = mouseX - img3X;
    const dyImg3 = mouseY - img3Y;

    const dxImg4 = mouseX - img4X;
    const dyImg4 = mouseY - img4Y;
    // Apply easing
    contentX += dxContent * ease;
    contentY += dyConten * ease;

    img1X += dxImg1 * imgEase;
    img1Y += dyImg1 * imgEase;

    img2X += dxImg2 * imgEase;
    img2Y += dyImg2 * imgEase;

    img3X += dxImg3 * imgEase;
    img3Y += dyImg3 * imgEase;

    img4X += dxImg4 * imgEase;
    img4Y += dyImg4 * imgEase;
    // Apply transforms
    heroContent.style.transform = `translate(${contentX * -3}px, ${
      contentY * -3
    }px)`;

    parallaxImages[0].style.transform = `translate(${img1X * -3}px, ${
      img1Y * -3
    }px)`;
    parallaxImages[1].style.transform = `translate(${img2X * -3.1}px, ${
      img2Y * -3.1
    }px)`;
    parallaxImages[2].style.transform = `translate(${img3X * -3.2}px, ${
      img3Y * -3.2
    }px)`;
    parallaxImages[3].style.transform = `translate(${img4X * -3.3}px, ${
      img4Y * -3.3
    }px)`;
    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 20;
    mouseY = (e.clientY - window.innerHeight / 2) / 20;

    // Update cursor position
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
});
