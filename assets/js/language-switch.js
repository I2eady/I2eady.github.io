(function () {
  const copy = {
    en: {
      title: "Zeran Wang | Homepage",
      name: "Zeran Wang",
      bio: "Dalian Maritime University",
      description: "Undergraduate student in Electronic Information Engineering at Dalian Maritime University.",
      location: "Dalian, China",
      email: "Email",
      nav: ["About Me", "News", "Publications", "Selected Projects", "Honors and Awards", "Educations", "Technical Skills"],
      home: "Homepage",
      anchors: ["about-me", "-news", "-publications", "-selected-projects", "-honors-and-awards", "-educations", "-technical-skills"]
    },
    zh: {
      title: "王泽然 | 个人主页",
      name: "王泽然",
      bio: "大连海事大学",
      description: "大连海事大学信息科学技术学院电子信息工程专业本科生。",
      location: "中国 · 大连",
      email: "邮箱",
      nav: ["关于我", "动态", "科研成果", "精选项目", "荣誉奖项", "教育经历", "专业技能"],
      home: "首页",
      anchors: ["about-me", "-news", "-publications", "-selected-projects", "-honors-and-awards", "-educations", "-technical-skills"]
    }
  };

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setLanguage(language) {
    const selected = copy[language] ? language : "en";
    const content = copy[selected];
    document.body.dataset.language = selected;
    document.documentElement.lang = selected === "zh" ? "zh-CN" : "en";
    document.title = content.title;
    document.querySelectorAll(".language-content").forEach((section) => {
      section.hidden = !section.classList.contains(`lang-${selected}`);
    });
    setText(".author__name", content.name);
    setText(".author__bio", content.bio);
    setText("#site-description", content.description);
    setText("#author-location", content.location);
    setText("#contact-email-label", content.email);

    document.querySelectorAll("[data-language-section]").forEach((link) => {
      const key = link.dataset.languageSection;
      if (key === "home") {
        link.textContent = content.home;
        link.setAttribute("href", `#${content.anchors[0]}-${selected}`);
        return;
      }
      const index = Number(key);
      if (Number.isInteger(index) && content.nav[index]) {
        link.textContent = content.nav[index];
        link.setAttribute("href", `/#${content.anchors[index]}-${selected}`);
      }
    });

    document.querySelectorAll("[data-language-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.languageChoice === selected));
    });
    try { window.localStorage.setItem("zeran-homepage-language", selected); } catch (error) { /* Storage is optional. */ }
  }

  document.querySelectorAll("[data-language-choice]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.languageChoice));
  });

  let initialLanguage = "en";
  try { initialLanguage = window.localStorage.getItem("zeran-homepage-language") || "en"; } catch (error) { /* Use English by default. */ }
  setLanguage(initialLanguage);
}());
