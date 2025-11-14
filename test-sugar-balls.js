(function () {
    let failures = 0;
  
    function assert(condition, message) {
      if (!condition) {
        console.error("❌ Test FAILED: " + message);
        failures++;
      } else {
        console.log("✅ Test passed: " + message);
      }
    }
  
    function runTests() {
      console.log("---- 🍬 Simos & Ebros Şeker Topları TESTLERİ ----");
  
      // 1) Temel elemanlar var mı?
      const canvas = document.getElementById("cv");
      assert(
        canvas instanceof HTMLCanvasElement,
        "#cv canvas elemanı bulunmalı"
      );
  
      const sizeButtons = document.querySelectorAll(".size");
      assert(sizeButtons.length === 3, "3 adet boyut butonu (.size) olmalı");
  
      const colorSwatches = document.querySelectorAll(".sw");
      assert(colorSwatches.length === 8, "8 adet renk swatch (.sw) olmalı");
  
      const startBtn = document.getElementById("start");
      const stopBtn = document.getElementById("stop");
      const resetBtn = document.getElementById("reset");
      const speedBtn = document.getElementById("speed");
      const soundBtn = document.getElementById("sound");
  
      assert(startBtn, "#start butonu bulunmalı");
      assert(stopBtn, "#stop butonu bulunmalı");
      assert(resetBtn, "#reset butonu bulunmalı");
      assert(speedBtn, "#speed butonu bulunmalı");
      assert(soundBtn, "#sound butonu bulunmalı");
  
      const cntEl = document.getElementById("cnt");
      const spdEl = document.getElementById("spd");
      assert(cntEl, "#cnt span'i bulunmalı");
      assert(spdEl, "#spd span'i bulunmalı");
  
      // 2) Boyut butonuna tıklayınca top sayısı artıyor mu?
      const beforeCount = parseInt(cntEl.textContent, 10) || 0;
      sizeButtons[0].click(); // küçük top ekle
      const afterCount = parseInt(cntEl.textContent, 10) || 0;
      assert(
        afterCount === beforeCount + 1,
        "Küçük top butonuna tıklayınca top sayısı 1 artmalı"
      );
  
      // 3) Hızlandır butonu hızı artırıyor mu?
      const parseSpeed = (txt) => parseFloat(String(txt).replace(",", "."));
      const speedBefore = parseSpeed(spdEl.textContent);
      speedBtn.click();
      const speedAfter = parseSpeed(spdEl.textContent);
      assert(
        speedAfter > speedBefore,
        "Hızlandır butonu (#speed) hız değerini artırmalı"
      );
  
      // 4) Ses butonu ikon değiştiriyor mu?
      const soundLabelBefore = soundBtn.textContent;
      soundBtn.click();
      const soundLabelAfter = soundBtn.textContent;
      assert(
        soundLabelBefore !== soundLabelAfter,
        "Ses butonu (#sound) ikon metnini değiştirmeli (🔊 / 🔈)"
      );
      // eski haline döndür
      soundBtn.click();
  
      // 5) Reset butonu sayaç ve hızı sıfırlıyor mu?
      // önce birkaç top daha ekleyip hızı yeniden artırıyoruz
      sizeButtons[1].click();
      sizeButtons[2].click();
      speedBtn.click();
  
      resetBtn.click();
      const countAfterReset = parseInt(cntEl.textContent, 10) || 0;
      const speedAfterReset = parseSpeed(spdEl.textContent);
  
      assert(countAfterReset === 0, "Sıfırla butonu top sayısını 0 yapmalı");
      assert(
        Math.abs(speedAfterReset - 1.0) < 0.001,
        "Sıfırla butonu hızı 1.00 değerine döndürmeli"
      );
  
      console.log(
        "---- TESTLER BİTTİ. Hata sayısı: " + failures + " ----"
      );
      if (failures === 0) {
        console.log("🎉 Tüm testler başarıyla geçti!");
      }
    }
  
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", runTests);
    } else {
      runTests();
    }
  })();
  