
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl,SelectControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/gallery-block', {
    title:  stringData.newgallerty,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
                    captiondata:'',
					
				  },
			],
        },
        postsectiontitle: {
            type: 'string',
            default: stringData.Heading,
        },
        columentvalue: {
            type: 'string',
            default: '',
        },
		
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,postsectiontitle,columentvalue } = attributes;
        return (
            
            <div class="gallery-grid-block">
                {postsectiontitle &&
               <div class="web-heading heading-divider">  
            <h2>{postsectiontitle}</h2>
            </div>
             }
            <div class="fancybox-wrap">
                <div class="row">
                {items.map((item, index) => (  
                    <div className={` col-md-4 ${columentvalue ? `col-lg-${columentvalue}` : 'col-lg-6'}`}>
                        <a href={item.imgeurl} data-fancybox="gallery-grid" data-caption={item.captiondata}>
                            {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                        </a>
                    </div>
                    ))}	
                </div>
            </div>
        </div>
          
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    
    const { items,  postsectiontitle, columentvalue } = props.attributes;

    function updateItem(index, key, value) {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        props.setAttributes({ items: updatedItems });
    }

    

    function addItem() {
        const newItem = {
            imgeurl: urlimage,
            imgealt: '',
            captiondata:'',
            
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
        <div class="gallery-grid-block">
            <InspectorControls>
                <PanelBody title={stringData.add_images_gallery}>
                <TextControl
                    label={stringData.sectiont}
                    value={postsectiontitle}
                    onChange={(newTitle) => props.setAttributes({ postsectiontitle: newTitle })}
                />
                    <SelectControl
                        label={stringData.columnvalue}
                        value={columentvalue}
                        options={[
                            { label: ' 2', value: '6' },
                            { label: ' 3', value: '4' },
                            { label: ' 4', value: '3' }
                        ]}
                        onChange={(newOption) => props.setAttributes({ columentvalue: newOption })}
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
            <div class="fancybox-wrap">
                <div class="row">
                {items.map((item, index) => (  
                    <div className={` col-md-4 ${columentvalue ? `col-lg-${columentvalue}` : 'col-lg-6'}`}>
                        <a href={item.imgeurl} data-fancybox="gallery-grid" data-caption={item.captiondata}>
                            {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                        </a>
                    </div>
                    ))}	
                </div>
            </div>
        </div>
							
		
	
               
    );
}

