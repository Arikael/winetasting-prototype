var loadFn = function () {
    var allTastes = {};
    var pixelRatio = window.devicePixelRatio;
    var logicalResolution = `${window.screen.availWidth}x${window.screen.availHeight}`;
    var physicalResolution = `${window.screen.availWidth * pixelRatio}x${window.screen.availHeight * pixelRatio}`;

    var template = document.querySelector('#debugInformationTemplate').innerHTML;
    var debugInfoData = {
        pixelRatio,
        logicalResolution,
        physicalResolution
    };

    var debugInfo = Sqrl.Render(template, debugInfoData);
    document.querySelector('.debug-information').innerHTML = debugInfo;

    var tasteRequest = new XMLHttpRequest();
    tasteRequest.open('GET', 'tastes.json');
    tasteRequest.responseType = 'json';
    tasteRequest.send();
    tasteRequest.onload = function () {
        var tasteTemplate = document.querySelector('#tastesTemplate').innerHTML;
        allTastes = tasteRequest.response;
        var tastes = Sqrl.Render(tasteTemplate, tasteRequest.response);
        document.querySelector('#taste-data').innerHTML = tastes;

        //taste buttons
        var tasteButtons = document.querySelectorAll('.taste');
        Array.from(tasteButtons).forEach(function (element) {
            var hammer = new Hammer.Manager(element, {});
            var singleTap = new Hammer.Tap({ event: 'singletap' });
            var doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });

            hammer.add([doubleTap, singleTap]);
            doubleTap.recognizeWith(singleTap);
            singleTap.requireFailure([doubleTap]);

            hammer.on('singletap', function (event) {
                var currentTarget = findTaste(event.srcEvent);

                if (currentTarget) {
                    currentTarget.classList.toggle('selected');
                }
            });

            hammer.on('doubletap', function (event) {
                var currentTarget = findTaste(event.srcEvent);
                var tasteName = currentTarget.getAttribute('data-name');
                var categoryName = currentTarget.parentElement.parentElement.getAttribute('data-name');

                var category = allTastes.categories.find(function (element) {
                    return element.name === categoryName;
                });

                if (!category) return false;

                var taste = category.tastes.find(function (element) {
                    return element.name === tasteName;
                });

                var tasteEditTemplate = document.querySelector('#taste-edit').innerHTML;
                var tastes = Sqrl.Render(tasteEditTemplate, taste);
                var dialog = document.querySelector('#taste-edit-dialog');
                dialog.classList.add('open');
                dialog.innerHTML = tastes;
            })
        });
    }

    //style switcher
    var styleButtons = document.querySelectorAll('[data-style');

    Array.from(styleButtons).forEach(function (element) {
        element.addEventListener('click', function (event) {
            var styleClass = event.srcElement.getAttribute('data-style');
            document.querySelector('#taste-data').className = styleClass;
        });
    });
};

function findTaste(srcEvent) {
    var currentElement = srcEvent.target;

    while(currentElement != null) {
        if (currentElement.classList.contains('taste')) break;
        currentElement = currentElement.parentElement;
    }

    return currentElement;
}