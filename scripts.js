var allSelectedTastes = [];

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

    var singleTap = new Hammer.Tap({ event: 'singletap' });
    var doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
    doubleTap.recognizeWith(singleTap);
    singleTap.requireFailure([doubleTap]);

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
            hammer.add([doubleTap, singleTap]);
            
            hammer.on('singletap', function (event) {
                var currentTarget = findTaste(event.srcEvent);

                if (currentTarget) {
                    currentTarget.classList.toggle('selected');
                    var taste = new Taste();
                    taste.title = currentTarget.innerText;
                    taste.name = currentTarget.getAttribute('data-name');
                    toggleTaste(taste);
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
                dialog.attributes['data-name'] = tasteName;
                dialog.classList.add('open');
                dialog.innerHTML = tastes;

                document.querySelector('.taste-edit__back').addEventListener('click', function() {
                    document.querySelector('#taste-edit-dialog').classList.remove('open');
                });

                var detailButtons = document.querySelectorAll('.detail-button');
                Array.from(detailButtons).forEach(function (btn) {
                    var detailHammer = new Hammer(btn);
                    detailHammer.on('tap', function(e) {
                        e.target.classList.toggle('selected');
                    });
                });

                var okBtn = document.querySelector('.taste-edit__ok');
                var okHammer = new Hammer(okBtn);
                okHammer.on('tap', function(e) {
                    handleTasteDetails();
                });

                var dialogHammer = new Hammer(tasteEditTemplate);
                dialogHammer.on('swipeUp', function(e) {
                    handleTasteDetails();
                });



                document.querySelector('.taste-edit__back').addEventListener('click', function() {
                    closeDialog();
                });
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

function closeDialog() {
    document.querySelector('#taste-edit-dialog').classList.remove('open');
}

function handleTasteDetails() {

    var smellTime = document.querySelector('.taste-edit__when .btn.selected');
    var smellAmount = document.querySelector('.taste-edit__howmuch .btn.selected');

    var taste = new Taste();
    taste.name = document.querySelector('#taste-edit-dialog').getAttribute('data-name');
    taste.title = document.querySelector('.taste-title').innerText;

    if(smellTime) {
        taste.smellTime = smellTime.innerText;
    }

    if(smellAmount) {
        taste.smellAmount = smellAmount.innerText;
    }

    toggleTaste(taste);
    closeDialog();
}

function getTasteDetails() {
    var selectedButtons = document.querySelectorAll('.detail-button.selected');
    Array.from(selectedButtons).forEach(function(btn) {

    });
}

function toggleTaste(taste) {
    var index = allSelectedTastes.findIndex(function(value) {
        return value.name === taste.name;
    });

    if(index === -1) {
        allSelectedTastes.push(taste);
    }
    else {
        allSelectedTastes.splice(index, 1);
    }

    updateNotes();
}

function updateNotes() {
    var allNotes = [];
    allSelectedTastes.forEach(element => {
        var singleNote = '';
        if(element.smellTime) {
            singleNote = element.smellTime + ' ';
        }

        if(element.smellAmount) {
            singleNote += element.smellAmount + ' ';
        }

        singleNote += element.title;
        allNotes.push(singleNote);
    });

    document.querySelector('.taste-notes').innerText = allNotes.join(', ');
}

function findTaste(srcEvent) {
    var currentElement = srcEvent.target;

    while(currentElement != null) {
        if (currentElement.classList.contains('taste')) break;
        currentElement = currentElement.parentElement;
    }

    return currentElement;
}

class Taste {
    name = '';
    title = '';
    smellAmount = '';
    smellTime = '';
}