(function(Image) {
    "use strict";
    /* globals Designer */
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
        'disabled': ['background-image', 'background-repeat']
    });

    Image.doAfter('init', function() {
        //Backward compatibility
        //TOFIX: Add a parameter in package.json to define the main widget property
        this.value = this.image;

        showUrl.call(this);
        this.url.onChange(showUrl);
        this.subscribe('datasourceBindingChange', 'image', this.render, this);
        this.subscribe('datasourceBindingChange', 'url', showUrl, this);

        // disable click events in studio
        $(this.node).off('click', this._handleClick);
    });

    Image.customizeProperty('url', {title: 'URL'});
    Image.customizeProperty('urlTarget', {title: 'Target'});

    Image.prototype._extractImageURL = function() {
        var style = this.node.style.backgroundImage;
        style = Designer.util.unfixStyleURL(style);
        var r = /url *\( *['"]?(.*)['"]? *\)/.exec(style);
        return r && r[1] || null;
    };

    Image.prototype._changeImage = function(url){
        this.node.style.backgroundImage = Designer.util.fixStyleURL(url ? 'url("'+url+'")' : '');
    };

});
