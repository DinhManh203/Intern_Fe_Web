import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Inject CSS vào đầu trang để ẩn logo Google
    const style = document.createElement('style');
    style.innerHTML = `
      .goog-logo-link { display: none !important; }
      .goog-te-gadget span { display: none !important; }
    `;
    document.head.appendChild(style);
  
    // Add script như trước
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
  
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,vi,fr,de",
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
          },
          "google_translate_element"
        );
      };
    }
  }, []);  

  return (
    <div className="w-full bg-[#f5f5f5] px-6 py-2 flex justify-end text-sm">
      <div id="google_translate_element" />
    </div>


  );
};

export default GoogleTranslate;
