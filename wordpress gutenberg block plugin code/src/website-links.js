
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;
const linksvg                  = myBlockData.linksvg;

registerBlockType('giosnamespace/website-link', {
    title: stringData.website_link,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [],
        },
		
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,slideritems } = attributes;
        return (
            <div class="links-block">
            {items.map((item, index) => (
            <div class="block-link-sec">
                <a href={item.url} class="d-flex align-items-center">
                    <div class="icon-sec">
                    <img src={linksvg} alt="icon" />
                    </div>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </a>
            </div>
            ))}        
        </div> 
          
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    
    const { items, slideritems } = props.attributes;

    function updateItem(index, key, value) {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        props.setAttributes({ items: updatedItems });
    }

    
    function addItem() {
        const newItem = {
           
            title: 'Communication strategy',
            url : '',
           
        };
        props.setAttributes({ items: [...items, newItem] });
    }
    if (props.attributes.items.length === 0) {
        props.setAttributes({ items: [{ title: 'Communication strategy', url : '' }] });
    }
    function removeItem(index) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        props.setAttributes({ items: updatedItems });
    }

    

    
	

    return (
        <div class="links-block">
            <InspectorControls>
                <PanelBody title={stringData.Training_File_Block}>
                    {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3>{stringData.repeter} {index + 1}</h3>
                        
                            <TextControl
                                label={stringData.Title}
                                placeholder={stringData.Enter_a_title}
                                value={item.title}
                                onChange={(value) => updateItem(index, 'title', value)}
                            />
                            <TextControl
                                label={stringData.enter_url}
                                value={item.url}
                                onChange={(value) => updateItem(index, 'url', value)}
                            />
                            <button onClick={() => removeItem(index)} className="button button-danger">{stringData.remove}</button>
                        </div>
                    ))}
                    <button onClick={addItem} className="button button-primary">{stringData.add_item}</button>
                </PanelBody>
            </InspectorControls>

                
            {items.map((item, index) => (
            <div class="block-link-sec">
                <a href={item.url} class="d-flex align-items-center">
                    <div class="icon-sec">
                    <img src={linksvg} alt="icon" />
                    </div>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </a>
            </div>
            ))}        
        </div>                   
                   
    );
}
