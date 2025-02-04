
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls ,InnerBlocks }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/program-schedule-list', {
    title: stringData.program_schedule_list,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [
				{
					startdate:'9:45',
                    Enddate:'10:00',
					content:'Rejestracja uczestników',
				  },
			],
        },
		
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,slideritems } = attributes;
        return (
	<>
	   <div class="harmonogram-list-wrap">
            {items.map((item, index) => ( 
                <div key={index} class="harmonogram-row d-flex">
                    <div class="harmonogram-hours">{item.startdate}<span>-</span>{item.Enddate}</div>
                    <div class="harmonogram-text">
                        <p>{item.content}</p>
                    </div>
                </div>
                ))} 
        </div>  
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
            startdate:'9:45',
            Enddate:'10:00',
            content:'Rejestracja uczestników',
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
            if (media && media.url) {
                updateItem(index, 'imgeurl', media.url);
            }
        });

        mediaLibrary.open();
    }
	

    return (
        <>
          
            <InspectorControls>
                <PanelBody title={stringData.Repeater_slidtyr}>
                    {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3>{stringData.slider} {index + 1}</h3>
                            <TextControl
                                label={stringData.start_date}
                                
                                value={item.startdate}
                                onChange={(value) => updateItem(index, 'startdate', value)}
                            />
                            <TextControl
                                label={stringData.end_date}
                                value={item.Enddate}
                                onChange={(value) => updateItem(index, 'Enddate', value)}
                            />
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
            
        <div class="harmonogram-list-wrap">
            {items.map((item, index) => ( 
                <div key={index} class="harmonogram-row d-flex">
                    <div class="harmonogram-hours">{item.startdate}<span>-</span>{item.Enddate}</div>
                    <div class="harmonogram-text">
                        <p>{item.content}</p>
                    </div>
                </div>
                ))} 
        </div>               
        </>
    );
}
