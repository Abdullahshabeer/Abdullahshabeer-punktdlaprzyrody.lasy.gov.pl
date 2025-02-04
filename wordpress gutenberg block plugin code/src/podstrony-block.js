
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl , CheckboxControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/podstrony-block', {
    title: stringData.podstrony_block,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [],
        },
        upcomingchecbox: {
            type: 'boolean',
            default: false,
        },
		
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,slideritems , upcomingchecbox } = attributes;
        return (
        <div class="podstrony-block">
            <div  class="row">
            {items.map((item, index) => (
                <div key={index} class="col-xl-6 col-md-6">
                    <div class="podstrony-card">
                    <a href={item.sectionurl} class={"podstrony-card-inner d-flex align-items-center flex-column" + (upcomingchecbox ? " no-img-hover" : "")}>
                            <div class="card-icon"> {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}</div>
                            <h3>{item.title}</h3>
                        </a>
                    </div>
                </div>
                ))}
            </div>
        </div>
          
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    const { attributes, setAttributes } = props;

    const { items, slideritems , upcomingchecbox } = attributes;

    function updateItem(index, key, value) {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        props.setAttributes({ items: updatedItems });
    }

    if (props.attributes.items.length === 0) {
        props.setAttributes({ items: [{ imgeurl: urlimage, title: 'Punkt dla Przyrody', sectionurl: '' }] });
    }

    function addItem() {
        const newItem = {
            imgeurl:  urlimage,
            imgealt: '',
            title: 'Punkt dla Przyrody',
            sectionurl:'',
            
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
                updateItem(index, 'imgealt', media.alt);
            }
        });

        mediaLibrary.open();
    }
	

    return (
        <div class="podstrony-block">
            <InspectorControls>
                <PanelBody title={stringData.Repeattyu_slider}>
                    {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3>{stringData.sliderdy} {index + 1}</h3>
                            {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                            <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Select_an_image}</button>
                            <CheckboxControl
                                label= {stringData.remove_image_hover}
                                checked={upcomingchecbox}
                                onChange={(newChecked) => setAttributes({ upcomingchecbox: newChecked })}
                            />
                            <TextControl
                                label={stringData.Title}
                                placeholder={stringData.Enter_a_title}
                                value={item.title}
                                onChange={(value) => updateItem(index, 'title', value)}
                            />
                              <TextControl
                                label={stringData.enter_url}
                                
                                value={item.sectionurl}
                                onChange={(value) => updateItem(index, 'sectionurl', value)}
                            />
                            
                            <button onClick={() => removeItem(index)} className="button button-danger">{stringData.remove}</button>
                        </div>
                    ))}
                    <button onClick={addItem} className="button button-primary">{stringData.Add_a_item}</button>
                </PanelBody>
            </InspectorControls>
            
        
            <div class="row">
            {items.map((item, index) => (
                <div key={index} class="col-xl-6 col-md-6">
                    <div class="podstrony-card">
                    <a href={item.sectionurl} class={"podstrony-card-inner d-flex align-items-center flex-column" + (upcomingchecbox ? " no-img-hover" : "")}>
                            <div class="card-icon"> {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}</div>
                            <h3>{item.title}</h3>
                        </a>
                    </div>
                </div>
                ))}
            </div>
        </div>
                            
        
    );
}
