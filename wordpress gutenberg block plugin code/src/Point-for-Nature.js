
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl ,SelectControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/point-of-nature', {
    title: stringData.point_of_nature,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        
		slideritems: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
					content: 'KONSULTACJE',
                    button:'',
                    buttonurl:'#',
					
					
				  },
			],
        },
        sectionTitle: {
            type: 'string',
            default: '',
        },
        sectionstyle: {
            type: 'string',
            default: 'style1',
        },
        sectioncolor: {
            type: 'string',
            default: '',
        },
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { slideritems , sectionTitle } = attributes;
        return (
            <>
    <div className={`scheme-block ${attributes.sectionstyle === 'style1' ? 'light-bg' : ''}`} style={{ background: attributes.sectioncolor }}>
            {attributes.sectionTitle && 
                <div class="web-heading text-center">
                   <h2>{attributes.sectionTitle}</h2>
                </div>
            }
            
            <div class="scheme-wrap">
                
            {slideritems.map((item, index) => ( 
                <div class="scheme-row">
                     <div class="icon" style={{ background: attributes.sectioncolor }}>
                        
                        {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                    </div>
                    <div class="scheme-content">
                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                        {item.button && 

                          <a href={item.buttonurl}>{item.button} <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                          <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg></a>
                        }
                        
                    </div>
                </div>
            ))}     
        </div>
    </div>
	</>				
          
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    const { setAttributes, attributes } = props;
    const {  slideritems, sectionTitle } = attributes;

   
    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
       setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    

    function addItemSec() {
        const newItem = {
            imgeurl:  '',
            imgealt: '',
			content: 'KONSULTACJE',
        };
       setAttributes({ slideritems: [...slideritems, newItem] });
    }

   

    function removeSliderItem(index) {
        const updatedSliderItems = [...slideritems];
        updatedSliderItems.splice(index, 1);
       setAttributes({ slideritems: updatedSliderItems });
    }

    
	function openMediaLibrarysecond(index) {
        const mediaLibrary = wp.media({
            title: stringData.Select_an_image,
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

        <>
         <InspectorControls>
            <PanelBody title={stringData.nature}>
                <TextControl
                        label={stringData.Section_title}
                        value={attributes.sectionTitle}
                        onChange={(newTitle) => setAttributes({ sectionTitle: newTitle })}
                    />
                     <SelectControl
                        label={stringData.nature_style}
                        value={attributes.sectionstyle }
                        options={[
                            {
                                value: 'style1',
                                label: stringData.style + '1',
                            },
                            {
                                value: 'style2',
                                label: stringData.style + '2',
                            },                                
                        ]}
                        onChange={(newTitle) => setAttributes({ sectionstyle: newTitle })}
                    />
                {slideritems.map((item, index) => (
                    <div key={index} className="mb-3">
                        <h3>{stringData.shortcuts_blockty} {index + 1}</h3>
                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                        <button onClick={() => openMediaLibrarysecond(index)} className="button button-secondary">{stringData.Select_an_image}</button>
                        <TextControl
                            label={stringData.Title}
                            placeholder={stringData.Enter_a_title}
                            value={item.content}
                            onChange={(value) => updateSliderItem(index, 'content', value)}
                        />
                        <TextControl
                            label={stringData.button_text}
                            
                            value={item.button}
                            onChange={(value) => updateSliderItem(index, 'button', value)}
                        />
                        <TextControl
                            label={stringData.Button_URL}
                            
                            value={item.buttonurl}
                            onChange={(value) => updateSliderItem(index, 'buttonurl', value)}
                        />
                        
                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.remove}</button>
                    </div>
                ))}
                <button onClick={addItemSec} className="button button-primary">{stringData.add_iteme}</button>
                <TextControl
                    label={stringData.Background_color}
                    value={attributes.sectioncolor}
                    onChange={(newTitle) => setAttributes({ sectioncolor: newTitle })}
                />
            </PanelBody>
        </InspectorControls>
		<div className={`scheme-block ${attributes.sectionstyle === 'style1' ? 'light-bg' : ''}`} style={{ background: attributes.sectioncolor }}>
            {attributes.sectionTitle && 
                <div class="web-heading text-center">
                   <h2>{attributes.sectionTitle}</h2>
                </div>
            }
            
            <div class="scheme-wrap">
            {slideritems.map((item, index) => ( 
                <div class="scheme-row">
                    <div class="icon" style={{ background: attributes.sectioncolor }}>
                        {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                    </div>
                    <div class="scheme-content">
                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                        {item.button && 

                          <a href={item.buttonurl}>{item.button} <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                          <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg></a>
                        }
                        
                    </div>
                </div>
            ))}     
        </div>
    </div>
</>					
    
              
    );
}
