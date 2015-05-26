WAF.define('Image', ['waf-core/widget'], function(widget) {
    "use strict";

    var Image = widget.create('Image', {
        image: widget.property({
            type: 'file',
            description: 'Image to display',
            accept: "image/*",
            folder: "images",
            defaultValueCallback: function() {
                return this._extractImageURL();
            }
        }),
        url: widget.property({
            type: 'string',
            description: 'URL to apply to the image'
        }),
        urlTarget: widget.property({
            type: 'enum',
            description: 'Location where to open the URL',
            values: ['_blank', '_self'],
            defaultValue: '_blank',
            bindable: false
        }),
        scale: widget.property({
            type: 'enum',
            description: 'Scale for the image displayed',
            values: {
                'auto':              'Original',
                'contain':           'Contain',
                'cover':             'Cover'
            },
            defaultValue: 'contain',
            defaultValueCallback: function() {
                var r = /(^| )scale-(auto|contain|cover)( |$)/.exec(this.node.className);
                return r && r[2] || 'contain';
            },
            bindable: false
        }),
        align: widget.property({
            type: 'enum',
            description: 'Alignment for the image',
            values: {
                'top left':          'Top-left',
                'top center':        'Top-center',
                'top right':         'Top-right',
                'center left':       'Center-left',
                'center center':     'Center',
                'center right':      'Center-right',
                'bottom left':       'Bottom-left',
                'bottom center':     'Bottom-center',
                'bottom right':      'Bottom-right'
            },
            defaultValue: 'top left',
            defaultValueCallback: function() {
                var r = /(^| )align-(top|center|bottom)-(left|center|right)( |$)/.exec(this.node.className);
                return r && (r[2] + ' ' + r[3]) || 'top left';
            },
            bindable: false
        }),
        _extractImageURL: function() {
            var r = /url *\( *['"]?(.*)['"]? *\)/.exec(this.node.style.backgroundImage);
            return r && r[1] || null;
        },
        _changeImage: function(url){
            this.node.style.backgroundImage = url ? 'url("'+url+'")' : '';
        },
        _changeScale: function(value) {
            var $node = $(this.node);
            [
                'scale-auto',        'scale-contain',       'scale-cover',
            ].forEach(function(klass) {
                $node.removeClass(klass);
            });
            if (value) {
                $node.addClass('scale-' + value);
            }
        },
        _changeAlign: function(value) {
            var $node = $(this.node);
            [
                'align-top-left',    'align-top-center',    'align-top-right',
                'align-center-left', 'align-center-center', 'align-center-right',
                'align-bottom-left', 'align-bottom-center', 'align-bottom-right'
            ].forEach(function(klass) {
                $node.removeClass(klass);
            });
            if (value) {
                $node.addClass('align-' + value.replace(' ', '-'));
            }
        },
        init: function() {
            this.addClass('waf-img');
            this._changeImage(this.image());
            this._changeScale(this.scale());
            this._changeAlign(this.align());
            this.image.onChange(this._changeImage);
            this.scale.onChange(this._changeScale);
            this.align.onChange(this._changeAlign);
            this.url.onChange(function(){
                if(this.url() && !this.style('cursor')){
                    this.style({
                        'cursor' : 'pointer'
                    });
                }else{
                    this.style({
                        'cursor' : ''
                    });
                }
            });

            this._handleClick = function(event) {
                this.fire('action');
                if(this.url()) {
                    if(this.urlTarget() === '_blank') {
                        window.open(this.url());
                    } else {
                        window.location = this.url();
                    }
                }
            }.bind(this);
            $(this.node).on('click', this._handleClick);
        }
    });

    return Image;
});
