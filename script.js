// 페이지 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const buttons = document.querySelectorAll("header button[data-target]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const box = document.querySelector(`.${button.dataset.target}`);
      if (!box) return;

      if (box.hidden) {
        // 열 때: main 맨 위로 옮겨서 가장 최근에 누른 게 위에 오도록
        main.prepend(box);
        box.hidden = false;
      } else {
        // 닫을 때: 숨기기만 함
        box.hidden = true;
      }

      // 버튼에 열림 상태 표시 (CSS에서 둥근 모양 유지에 사용)
      button.setAttribute("aria-pressed", !box.hidden);
    });
  });

  // 메뉴 버튼: 누른 버튼만 숨기고 그 자리에 하위 메뉴를 보여줌
  const menuButtons = document.querySelectorAll("header button[data-open]");

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMenu = document.getElementById(button.dataset.open);
      if (!nextMenu) return;

      button.hidden = true;
      nextMenu.hidden = false;
    });
  });

  // 갤러리 이미지: 누르면 크게 보기, 아무 곳이나 누르거나 Esc로 닫기
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector("img");

  document.addEventListener("click", (event) => {
    const img = event.target.closest(".gallery img");
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });

  lightbox.addEventListener("click", () => {
    lightbox.close();
  });
});
