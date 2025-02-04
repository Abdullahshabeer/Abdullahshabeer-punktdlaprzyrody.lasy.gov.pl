
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/icon-heading-block', {
    title: stringData.icon_heading_block,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        
		slideritems: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
					title: 'Znajdź dofinsowanie',
					content: 'DOFINANSOWANIE',
					
					
				  },
			],
        },
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,slideritems } = attributes;
        return (
     <div class="block-icon-lists">    
            {slideritems.map((item, index) => (
                        
                <div key={index} class="list-row d-flex">
                    <div class="icon">
                      {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                    </div>
                    <div class="list-content">
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                    </div>
                </div>
               
                
                ))}
    </div>
          
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    
    const { items, slideritems } = props.attributes;

    
    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
        props.setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    

    function addItemSec() {
        const newItem = {
            imgeurl:  urlimage,
            imgealt: '',
            title: 'Znajdź dofinsowanie',
            content: 'DOFINANSOWANIE',
           
            
        };
        props.setAttributes({ slideritems: [...slideritems, newItem] });
    }

   

    function removeSliderItem(index) {
        const updatedSliderItems = [...slideritems];
        updatedSliderItems.splice(index, 1);
        props.setAttributes({ slideritems: updatedSliderItems });
    }

   
	function openMediaLibrarysecond(index) {
        const mediaLibrary = wp.media({
            title: 'Select Image',
            multiple: false,
        });

        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
            if (media && media.url) {
                updateSliderItem(index, 'imgeurl', media.url);
                updateSliderItem(index, 'imgealt', media.alt);
            }
        });

        mediaLibrary.open();
    }

    return (
        <div class="block-icon-lists">
                        <InspectorControls>
                            <PanelBody title={stringData.icon_heading_blocktitl}>
                                {slideritems.map((item, index) => (
                                    <div key={index} className="mb-3">
                                        <h3>{stringData.side_blocky} {index + 1}</h3>
                                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                                        <button onClick={() => openMediaLibrarysecond(index)} className="button button-secondary">{stringData.Select_an_image}</button>

										
										<TextControl
                                            label={stringData.Title}
                                           
                                            value={item.title}
                                            onChange={(value) => updateSliderItem(index, 'title', value)}
                                        />
                                        <TextControl
                                            label={stringData.description}
                                            value={item.content}
                                            onChange={(value) => updateSliderItem(index, 'content', value)}
                                        />
                                        

                                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.remove}</button>
                                    </div>
                                ))}
                                <button onClick={addItemSec} className="button button-primary">{stringData.Add_a_item}</button>
                            </PanelBody>
                        </InspectorControls>
                        {slideritems.map((item, index) => (
                        
                        <div key={index} class="list-row d-flex">
							<div class="icon">
                              {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
							</div>
							<div class="list-content">
								<h2>{item.title}</h2>
								<p>{item.content}</p>
							</div>
						</div>
                       
                        
						))}
            </div>
              
    );
}
