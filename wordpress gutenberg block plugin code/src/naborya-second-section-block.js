
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl, SelectControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/section-repeter-block', {
    title: ' naborye section block ',
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [
				{
					imgeurl:  '',
                    imgealt: '',
                    style: '',
					title: '',
                    inner_title:'',
                    color  : '#eef3ff',
                    content: '',
					button: '',
					link: '#',
				  },
			],
        },
        selectdesign: {
            type: 'array',
            default: [
                {
                    value: '', // Unique value for style1
                    label: 'selected image side',
                },
                {
                    value: 'left', // Unique value for style1
                    label: ' left',
                },
                {
                    value: 'right', // Unique value for style1
                    label: 'right',
                },
                
            ],
        },
		
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,slideritems, selectdesign } = attributes;
        return (
            <>
            {items.map((item, index) => (
                <div key={index}>
                        {item.title && (
                        <div className="web-heading heading-divider">
                            <h2>{item.title}</h2>
                        </div>
                        )}
                    {item.content && (
                    <div className="quiz-container">
                        <div className="block-with-image light-bg" style={{ background: item.color }}>
                        <div className={`row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`}>
    
                                <div className={`col-lg-${item.imgeurl ? '7' : '12'}`}>
                                    {item.inner_title && (
                                    <div className="web-heading">
                                        <h3>{item.inner_title}</h3>
                                    </div>
                                    )}
                                    {item.content && <p>{item.content}</p>}
                                </div>
    
                                {item.imgeurl && (
                                    <div className="col-lg-5">
                                    <div className="block-img">
                                        <img src={item.imgeurl} alt={item.imgealt} />
                                    </div>
                                    </div>
                                )}
                            </div>
                        </div>
                            {item.button && (
                            <div className="web-btn">
                                <a href={item.link} className="btn btn-primary">
                                {item.button}
                                </a>
                            </div>
                            )}
                    </div>
                )} 
                </div>
                ))}
                </>
            
          
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    
    const { items, slideritems , selectdesign } = props.attributes;

    function updateItem(index, key, value) {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        props.setAttributes({ items: updatedItems });
    }

    function addItem() {
        const newItem = {
            imgeurl:  '',
            imgealt: '' ,
            style: '',
            title: '',
            inner_title:'',
            color  : '#eef3ff',
            content: '',
            button: '',
            link: '#',
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
        <>
                <InspectorControls>
                    <PanelBody title="Repeater slider Settings">
                        {items.map((item, index) => (
                            <div key={index} className="mb-3">
                                <h3>section {index + 1}</h3>
                                <TextControl
                                    label="Title"
                                    placeholder="Enter title..."
                                    value={item.title}
                                    onChange={(value) => updateItem(index, 'title', value)}
                                />
                                <TextControl
                                    label="content"
                                    placeholder="content..."
                                    value={item.content}
                                    onChange={(value) => updateItem(index, 'content', value)}
                                />
                                <TextControl
                                    label="background color"
                                    placeholder="color"
                                    value={item.color}
                                    onChange={(value) => updateItem(index, 'color', value)}
                                />
                                <TextControl
                                    label=" inner Title"
                                    placeholder="Enter title..."
                                    value={item.inner_title}
                                    onChange={(value) => updateItem(index, 'inner_title', value)}
                                />
                                
                                
                                {item.imgeurl && (
                                    <>
                                        <img src={item.imgeurl} alt="Image 1" className="mb-3" />
                                        <button onClick={() => updateItem(index, 'imgeurl', '')} className="button button-danger">Remove Image</button>
                                    </>
                                )}

                                <button onClick={() => openMediaLibrary(index)} className="button button-secondary">Select Image</button>
                                <SelectControl
                                    label="image side"
                                    value={item.style}
                                    options={ selectdesign}
                                    onChange={(value) => updateItem(index, 'style', value)}
                                />
                                <TextControl
                                    label="Button Text"
                                    value={item.button}
                                    onChange={(value) => updateItem(index, 'button', value)}
                                />
                                <TextControl
                                    label="url"
                                    value={item.link}
                                    onChange={(value) => updateItem(index, 'link', value)}
                                />
                                <button onClick={() => removeItem(index)} className="button button-danger">Remove</button>
                            </div>
                        ))}
                        <button onClick={addItem} className="button button-primary">Add Item</button>
                    </PanelBody>
                </InspectorControls>
            {items.map((item, index) => (
            <div key={index}>
                    {item.title && (
                    <div className="web-heading heading-divider">
                        <h2>{item.title}</h2>
                    </div>
                    )}
                {item.content && (
                <div className="quiz-container">
                    <div className="block-with-image light-bg" style={{ background: item.color }}>
                    <div className={`row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`}>

                            <div className={`col-lg-${item.imgeurl ? '7' : '12'}`}>
                                {item.inner_title && (
                                <div className="web-heading">
                                    <h3>{item.inner_title}</h3>
                                </div>
                                )}
                                {item.content && <p>{item.content}</p>}
                            </div>

                            {item.imgeurl && (
                                <div className="col-lg-5">
                                <div className="block-img">
                                    <img src={item.imgeurl} alt={item.imgealt} />
                                </div>
                                </div>
                            )}
                        </div>
                    </div>
                        {item.button && (
                        <div className="web-btn">
                            <a href={item.link} className="btn btn-primary">
                            {item.button}
                            </a>
                        </div>
                        )}
                </div>
            )} 
            </div>
            ))}
        </>            

                       
    );
}
