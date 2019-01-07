"using strict";

function startInteractivity() {
    var returnBtn = document.getElementById("returnBtn"),
        menuBtn1 = document.getElementById("menuItem1"),
        menuBtn2 = document.getElementById("menuItem2"),
        menuBtn3 = document.getElementById("menuItem3"),
        subSection1 = document.getElementById("subSection1"),
        subSection2 = document.getElementById("subSection2"),
        subSection3 = document.getElementById("subSection3"),
        physicsSection = document.getElementById("physicsSection"),
        pathTracerSection = document.getElementById("pathTracerSection");

    var returnBtnHandler = new ReturnBtnHandler(returnBtn);

    bindBtnToSection(menuBtn1, subSection1, returnBtn);
    bindBtnToSection(menuBtn2, subSection2, returnBtn);
    bindBtnToSection(menuBtn3, subSection3, returnBtn);
    bindBtnToSection(document.getElementById("projectLink1"), physicsSection, returnBtn);
    bindBtnToSection(document.getElementById("projectLink2"), pathTracerSection, returnBtn);

    highLight(menuBtn1, document.getElementById("rect1"));
    highLight(menuBtn2, document.getElementById("rect2"));
    highLight(menuBtn3, document.getElementById("rect3"));
}

function getScrollY() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    return y;
}

function bindBtnToSection(btn, section, returnBtn) {
    btn.onclick = function() {
        var rect = section.getBoundingClientRect();
        window.scrollTo(0, rect.top + getScrollY());
        returnBtn.style.display = null;
    };
}

function ReturnBtnHandler(returnBtn) {
    
    returnBtn.style.display = "none";
    var visible = false;

    returnBtn.onclick = function() {
        window.scrollTo(0, 0);
        returnBtn.style.display = "none";
    }

    var checkReturnBtnVisibility = function() {
        var y = getScrollY();
        var threshold = window.innerHeight - 100;
        if (visible) {
            if (y < threshold) returnBtn.style.display = "none";
            visible = false;
        } else {
            if (y > threshold) returnBtn.style.display = null;
            visible = true;
        }
    }

    window.onscroll = checkReturnBtnVisibility;
    window.ontouchmove = checkReturnBtnVisibility;
}

function highLight(btn, area) {
    btn.onmouseenter = function() {
        fill(area, "rgb(255, 157, 0)");
    }
    btn.onmouseleave = function() {
        fill(area, null);
    }
    btn.addEventListener("touchstart", function() {
        fill(area, "rgb(255, 157, 0)");
    }, false);
    btn.addEventListener("touchend", function() {
        fill(area, null);
    }, false);
}

function fill(area, color) {
    area.style.fill = color;
}