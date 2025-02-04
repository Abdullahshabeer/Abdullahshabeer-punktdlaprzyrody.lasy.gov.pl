
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/order-list-block', {
    title: stringData.order_list_block,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [
				{
					content:'Programu Fundusze Europejskie na Infrastrukturę, Klimat i Środowisko',
					
				  },
			],
        },
		
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,s } = attributes;
        return (
	<>
	   <ol class="ordered-list">
                {items.map((item, index) => (
                    <li>{item.content}</li>
                ))}
                
            </ol>
   </>
          
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
            content:'',
        };
        props.setAttributes({ items: [...items, newItem] });
    }

    

    function removeItem(index) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        props.setAttributes({ items: updatedItems });
    }

    

	

    return (
        <>
            <InspectorControls>
                <PanelBody title={stringData.Repeater_slidertyui}>
                    {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            <TextControl
                                label={stringData.description}
                                placeholder={stringData.Enter_a_description}
                                value={item.content}
                                onChange={(value) => updateItem(index, 'content', value)}
                            />
                            
                            <button onClick={() => removeItem(index)} className="button button-danger">{stringData.remove}</button>
                        </div>
                    ))}
                    <button onClick={addItem} className="button button-primary">{stringData.Add_a_item}</button>
                </PanelBody>
            </InspectorControls>
                
            <ol class="ordered-list">
                {items.map((item, index) => (
                    <li>{item.content}</li>
                ))}
                
            </ol>
                            
        </>
    );
}
