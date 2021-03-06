﻿app.controller('MailController', ['$scope', function ($scope) {
    var vm = $scope;

    vm.templates = [
        "template1",
        "template2",
        "template3"
    ];

    vm.user = [
        functions = [
            "Testfunctie 1",
            "Testfunctie 2",
            "Testfunctie 3"
        ],
        groupes = [
            "Testgroep 1",
            "Testgroep 2",
            "Testgroep 3"
        ]
    ];

    vm.mailsettings = {
        template: null,
        datumSend: null,
        onderwerp: null,
        verzender: null,
        antwoord: null,
        contents: {
            files: null,
            fileLinks: null,
            message: null
        },
        receiverSettings: {
            funcGroup: null,
            sysGroup: null,
            subDateGroup: null
        }
    };

    vm.documents = [
        {
            naam: "document 1"
        },
        {
            naam: "document 2"
        },
        {
            naam: "document 3"
        }
    ];

    vm.LoadTemplate = function () {
        if (vm.mailsettings.template != null) {
            var url = 'Templates/Mail/' + vm.mailsettings.template + '.html';
            readTemplate(url);
            var messageContent = localStorage.receivedTemplate;

            if (messageContent != "") {
                vm.mailsettings.contents.message = messageContent;

                console.log(vm.mailsettings);

                CKEDITOR.instances.editor.setData(messageContent, function () {
                    this.checkDirty(true);
                });
            } else {
                alert("Template niet gevonden!");
            }
        }
    };

    vm.uploadFile = function(files) {
        var fd = new FormData();
        fd.append("file", files[0]);

        console.log(fd);
    };

    function readTemplate(url) {
        var request = new XMLHttpRequest();
        request.open("get", url, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                localStorage.setItem('receivedTemplate', request.responseText);
            }
            if (request.status == 404) {
                localStorage.setItem('receivedTemplate', "");
            }
        }
        request.send(null);
    };
}]);

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);