(function constructor(args) {

    if (!OS_IOS && !OS_ANDROID) {
        console.warn('[karaoak.shadow] only supports iOS and Android.');
        return;
    }

    if (!_.isArray(args.children) || !_.contains(['Ti.UI.View', 'Ti.UI.Button'], args.children[0].apiName)) {
        console.error('[karaoak.shadow] is missing required Ti.UI.View or Ti.UI.Button as first child element.');
        return;
    }

    var payload = args.children[0];
    delete args.children;

    //_.extend($, args);

    if (OS_IOS) {

        payload.viewShadowColor = (args.shadowColor) ? args.shadowColor : '#44000000';
        payload.viewShadowOffset = { x: 2, y: 2 }; //TODO: Parameterize...
        $.addTopLevelView(payload);

    } else if (OS_ANDROID) {

        //Ti.API.info(JSON.stringify(payload));

        var container = Ti.UI.createView({

        });

        var apply = _.pick(payload,
            'width', 'height',
            'top', 'right', 'bottom', 'left', 'center',
            'opacity', 'visible',
            'bubbleParent'
        );

        if (_.size(apply)) {
            container.applyProperties(apply);
        }

        container.width = container.width + 4;
        container.height = container.height + 4;

        var shadow = Ti.UI.createView({
            backgroundColor: '#06000000',
            borderColor: '#06000000',
        });

        var apply = _.pick(payload,
            'width', 'height',
            'top', 'right', 'bottom', 'left', 'center',
            'borderWidth__', 'borderRadius',
            'opacity', 'visible',
            'bubbleParent'
        );

        if (_.size(apply)) {
            shadow.applyProperties(apply);
        }

        shadow.left = 0.5;
        shadow.top = 0.5;
        shadow.width = shadow.width + 3;
        shadow.height = shadow.height + 3;
        shadow.borderWidth = 20;

        container.add(shadow);

        payload.left = 1;
        payload.top = 1;
        container.add(payload);

        $.addTopLevelView(container);

    }

})(arguments[0] || {});


function transferProperties(args){

}

/*
 100% — FF
 95% — F2
 90% — E6
 85% — D9
 80% — CC
 75% — BF
 70% — B3
 65% — A6
 60% — 99
 55% — 8C
 50% — 80
 45% — 73
 40% — 66
 35% — 59
 30% — 4D
 25% — 40
 20% — 33
 15% — 26
 10% — 1A
 5% — 0D
 0% — 00
 */