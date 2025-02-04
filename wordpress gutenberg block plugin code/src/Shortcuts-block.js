
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/shortcutblock', {
    title: stringData.shortcuts_block,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        
		slideritems: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
					title: 'KONSULTACJE',
					button: 'Nunc vitae venenatis lectus. Morbi dictum sapien et odio fermentum condimentum. Integer consectetur lorem nec arcu bibendum consectetur. ',
					link: '#',
					
				  },
			],
        },
        sectionTitle: {
            type: 'string',
            default: 'Na skróty',
        },
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { slideritems , sectionTitle } = attributes;
        return (
            <>
            <section class="block-row shortcuts-sec">
	    
        <div class="container">
			<div class="shortcuts-sec-wrap light-bg">
				<div class="web-heading heading-divider">
					<h2>{attributes.sectionTitle}</h2>
				</div>
				<div class="shortcuts-cards">
					<div class="row">
                    {slideritems.map((item, index) => (
						<div key={index} class="col-xl-3 col-lg-6 col-md-6">
							<div class="shortcuts-card">
                            {item.link ? (
                                            <a href={item.link}>
                                                <div className="card-icon">
                                                    {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                                                </div>
                                                <h3>{item.title}</h3>
                                                <p>{item.button} </p>
                                            </a>
                                        ) : (
                                            <>
                                            <div className="card-icon">
                                                {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.button} </p>
                                            </>  
                                        )}
                                
							</div>
						</div>
                        ))}   
					</div>
				</div>
			</div>
		</div>
	</section>
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
            imgeurl:  urlimage,
            imgealt: '',
            title: 'KONSULTACJE',
            button: 'Nunc vitae venenatis lectus. Morbi dictum sapien et odio fermentum condimentum. Integer consectetur lorem nec arcu bibendum consectetur. ',
            link: '#',
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

        <section class="block-row shortcuts-sec">
         <InspectorControls>
            <PanelBody title={stringData.shortcuts_Repeater}>
                        <TextControl
                                label={stringData.Section_title}
                                value={attributes.sectionTitle}
                                onChange={(newTitle) => setAttributes({ sectionTitle: newTitle })}
                            />
                {slideritems.map((item, index) => (
                    <div key={index} className="mb-3">
                        <h3>{stringData.shortcuts_blocker} {index + 1}</h3>
                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                        <button onClick={() => openMediaLibrarysecond(index)} className="button button-secondary">{stringData.Select_an_image}</button>
                        <TextControl
                            label={stringData.Title}
                            placeholder={stringData.Enter_a_title}
                            value={item.title}
                            onChange={(value) => updateSliderItem(index, 'title', value)}
                        />
                        <TextControl
                            label={stringData.enter_url}
                            value={item.link}
                            onChange={(value) => updateSliderItem(index, 'link', value)}
                        />
                        <TextControl
                            label={stringData.description}
                            value={item.button}
                            onChange={(value) => updateSliderItem(index, 'button', value)}
                        />
                        
                        

                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.remove}</button>
                    </div>
                ))}
                <button onClick={addItemSec} className="button button-primary">{stringData.add_itemy}</button>
            </PanelBody>
        </InspectorControls>
		<div class="container">
			<div class="shortcuts-sec-wrap light-bg">
				<div class="web-heading heading-divider">
					<h2>{attributes.sectionTitle}</h2>
				</div>
				<div class="shortcuts-cards">
					<div class="row">
                    {slideritems.map((item, index) => (
						<div key={index} class="col-xl-3 col-lg-6 col-md-6">
							<div class="shortcuts-card">
                            {item.link ? (
                                            <a href={item.link}>
                                                <div className="card-icon">
                                                    {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                                                </div>
                                                <h3>{item.title}</h3>
                                                <p>{item.button} </p>
                                            </a>
                                        ) : (
                                            <>
                                            <div className="card-icon">
                                                {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.button} </p>
                                            </>  
                                        )}
							</div>
						</div>
                        ))}   
					</div>
				</div>
			</div>
		</div>
	</section>
    
              
    );
}
