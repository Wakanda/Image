WAF.define('Image', ['waf-core/widget'], function(widget) {
    "use strict";

    var placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwNDggMjA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNzA0IDcwNHEwIDgwLTU2IDEzNnQtMTM2IDU2LTEzNi01Ni01Ni0xMzYgNTYtMTM2IDEzNi01NiAxMzYgNTYgNTYgMTM2em0xMDI0IDM4NHY0NDhoLTE0MDh2LTE5MmwzMjAtMzIwIDE2MCAxNjAgNTEyLTUxMnptOTYtNzA0aC0xNjAwcS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXYxMjE2cTAgMTMgOS41IDIyLjV0MjIuNSA5LjVoMTYwMHExMyAwIDIyLjUtOS41dDkuNS0yMi41di0xMjE2cTAtMTMtOS41LTIyLjV0LTIyLjUtOS41em0xNjAgMzJ2MTIxNnEwIDY2LTQ3IDExM3QtMTEzIDQ3aC0xNjAwcS02NiAwLTExMy00N3QtNDctMTEzdi0xMjE2cTAtNjYgNDctMTEzdDExMy00N2gxNjAwcTY2IDAgMTEzIDQ3dDQ3IDExM3oiLz48L3N2Zz4=";

    var Image = widget.create('Image', {
        image: widget.property({
            type: 'file',
            description: 'Image to display',
            accept: "image/*",
            folder: "images"
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
            bindable: false
        }),
        imageIsMissing: function(){
            if(this.image() == null){
                return true;
            }
            return false;
        },
        changeImage: function(url){
            this.style({
                'background-image' : 'url("'+url+'")'
            });
        },
        render: function() {
            if(!this.imageIsMissing()){
                this.changeImage(this.image());
            }else{
                this.changeImage(placeholderImage);
            }
            this.style({
                'background-size' : this.scale(),
                'background-position' : this.align()
            });
        },
        init: function() {
            this.addClass('waf-img');
            this.render();
            this.image.onChange(function(){
                this.render(); 
            });
            this.scale.onChange(function(){ this.render(); });
            this.align.onChange(function(){ this.render(); });
            this.url.onChange(function(){
                if(this.url() && (typeof this.style('cursor') == 'undefined' || this.style('cursor') == '')){
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
                event.stopPropagation();
            }.bind(this);
            $(this.node).on('click', this._handleClick);
        }
    });

    return Image;
});
