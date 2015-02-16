(function(Image) {
    "use strict";
    Image.setWidth(120);
    Image.setHeight(110);

    Image.addEvents({ 
        'name':'click', 
        'category':'Mouse Events' 
    },{ 
        'name':'dblclick', 
        'description':'On Double Click',
        'category':'Mouse Events'
    },{ 
        'name':'mousedown', 
        'description':'On Mouse Down',
        'category':'Mouse Events'
    },{ 
        'name':'mousemove',
        'description':'On Mouse Move',
        'category':'Mouse Events'
    },{ 
        'name':'mouseout',
        'description':'On Mouse Out',
         'category':'Mouse Events'
    },{ 
        'name':'mouseover',
        'description':'On Mouse Over',
        'category':'Mouse Events'
    },{ 
        'name':'mouseup',
        'description':'On Mouse Up',
        'category':'Mouse Events'
    },{
        'name':'touchcancel',
        'description':'On Touch Cancel',
        'category':'Touch Events'
    },{ 
        'name':'touchend',
        'description':'On Touch End',
        'category':'Touch Events'
    },{ 
        'name':'touchmove',
        'description':'On Touch Move',
        'category':'Touch Events'
    },{ 
        'name':'touchstart',
        'description':'On Touch Start',
        'category':'Touch Events'
    });

    Image.addLabel({
        defaultValue: '',
        description: 'Label for widget'
    });

    Image.customizeProperty('align', {
        radio: true
    });

    var showUrl = function() {
        if(this.url() || this.url.boundDatasource()) {
            this.urlTarget.show();
        } else {
            this.urlTarget.hide();
        }
    };

    var callRender = function() {
        this.render();
    }

    Image.setPanelStyle({
        'fClass': true, //This property is for the design panel
        'text': false,
        'textShadow': false,
        'dropShadow': true, 
        'innerShadow': false,
        'background': true,
        'border': true,
        'sizePosition': true,
        'label': true,
        'disabled': ['border-radius', 'background-image', 'background-repeat']
    });

    Image.doAfter('init', function() {
        showUrl.call(this);
        this.url.onChange(showUrl);
        this.subscribe('datasourceBindingChange', 'image', callRender, this);
        this.subscribe('datasourceBindingChange', 'url', showUrl, this);
        
        // disable click events in studio
        $(this.node).off('click', this._handleClick);
    });

    Image.customizeProperty('url', {title: 'URL'});
    Image.customizeProperty('urlTarget', {title: 'Target'});
});
