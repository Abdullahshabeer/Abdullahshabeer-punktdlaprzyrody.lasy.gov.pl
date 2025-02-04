
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/text-title', {
    title: stringData.text_title,
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
        <div class="information-list"> 
            {items.map((item, index) => (
            <div class="d-flex info-list-row" style={{ borderColor: item.color }}>
                <div class="info-list-left">{item.title}</div>
                <div class="info-list-right" ><b dangerouslySetInnerHTML={{ __html: item.content }}></b></div>
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
           
            title: 'Temat szkolenia',
            content: 'Ut sollicitudin ipsum est, ',
            color: '#EEF3FF',
           
        };
        props.setAttributes({ items: [...items, newItem] });
    }

    if (props.attributes.items.length === 0) {
        props.setAttributes({ items: [{ color : '#EEF3FF', title: 'Temat szkolenia', content: 'Ut sollicitudin ipsum est, non maximus sem dignissim at.' }] });
    }

    function removeItem(index) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        props.setAttributes({ items: updatedItems });
    }

    

    
	

    return (
        <div class="information-list">
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
                                label={stringData.description}
                                placeholder={stringData.Enter_a_description}
                                value={item.content}
                                onChange={(value) => updateItem(index, 'content', value)}
                            />
                            <TextControl
                                label={stringData.border_color}
                               
                                value={item.color}
                                onChange={(value) => updateItem(index, 'color', value)}
                            />
                            
                            <button onClick={() => removeItem(index)} className="button button-danger">{stringData.remove}</button>
                        </div>
                    ))}
                    <button onClick={addItem} className="button button-primary">{stringData.Add_itemyu}</button>
                </PanelBody>
            </InspectorControls> 

                
            {items.map((item, index) => (
            <div class="d-flex info-list-row" style={{ borderColor: item.color }}>
                <div class="info-list-left">{item.title}</div>
                <div class="info-list-right" ><b dangerouslySetInnerHTML={{ __html: item.content }}></b></div>
            </div>
            ))}        
        </div>                    
                   
    );
}
