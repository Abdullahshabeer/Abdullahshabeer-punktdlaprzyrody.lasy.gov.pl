
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/slider-gallery-block', {
    title:  stringData.sliderallerty,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
                    captiondata: '',
					
				  },
			],
        },
        postsectiontitle: {
            type: 'string',
            default: stringData.sectiont,
        },
		
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,postsectiontitle } = attributes;
        return (
            
        <div class="gallery-slider-block">
            {postsectiontitle &&
                <div class="web-heading heading-divider">
                
                    <h2>{postsectiontitle}</h2>
                 
                </div>
            }
            <div class="owl-carousel owl-theme gallery-carousel">
            {items.map((item, index) => (     
                <div class="item">
                <a href={item.imgeurl} data-fancybox="gallery-carousel" data-caption={item.captiondata}>
                    {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                </a>
                </div>
            ))}
            </div>
        </div>
          
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    
    const { items,  postsectiontitle } = props.attributes;

    function updateItem(index, key, value) {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        props.setAttributes({ items: updatedItems });
    }

    

    function addItem() {
        const newItem = {
            imgeurl: urlimage,
            imgealt: '',
            captiondata: '',
            
        };
        props.setAttributes({ items: [...items, newItem] });
    }

   

    function removeItem(index) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        props.setAttributes({ items: updatedItems });
    }

    

    function openMediaLibrary(index) {
        const mediaLibrary = wp.media({
            title: 'Select Image',
            multiple: false,
        });

        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
            console.log(media);
            if (media && media.url) {
                updateItem(index, 'imgeurl', media.url);
                updateItem(index, 'imgealt', media.alt);
            }
            if(media && media.caption){
                updateItem(index, 'captiondata', media.caption);
            }
        });

        mediaLibrary.open();
    }
	

    return (
        <div class="gallery-slider-block">
            <InspectorControls>
                <PanelBody title= {stringData.slider_gallery_Settings}>
                <TextControl
                    label={stringData.Title}
                    value={postsectiontitle}
                    onChange={(newTitle) => props.setAttributes({ postsectiontitle: newTitle })}
                />
                    {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3> {stringData.image} {index + 1}</h3>

                            {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                            <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Select_an_image}</button>

                            <button onClick={() => removeItem(index)} className="button button-danger">{stringData.remove}</button>
                        </div>
                    ))}
                    <button onClick={addItem} className="button button-primary">{stringData.add_itemfanc}</button>
                </PanelBody>
            </InspectorControls>
                       
            {postsectiontitle &&
                <div class="web-heading heading-divider">
                
                    <h2>{postsectiontitle}</h2>
                 
                </div>
            }
                <div class=" owl-theme gallery-carousel">
                {items.map((item, index) => (     
                    <div class="item">
                    <a href={item.imgeurl} data-fancybox="gallery-carousel" data-caption={item.captiondata}>
                        {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                    </a>
                    </div>
                ))}
                </div>
            </div>
        
							
		
	
               
    );
}

