
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/contactmap', {
    title: stringData.Kontakt_home_block,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        
		slideritems: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
					title: 'ul. Kolejowa 5/7, 01-217 Warszawa',
					link: '',
					
				  },
			],
        },
        sectionTitle: {
            type: 'string',
            default: 'Kontakt',
        },
        Titlecontent: {
            type: 'string',
            default: 'Centrum Wsparcia Beneficjenta',
        },
        mapshortcode: {
            type: 'string',
            default: '',
        },
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { slideritems , sectionTitle, Titlecontent, mapshortcode } = attributes;
        return (
            <>
       <section class="block-row contact-map-sec light-bg">
	    
        <div class="container">
			<div class="row align-items-center">
				<div class="col-lg-5">
					<div class="contact-detail">
						<div class="web-heading">
							<h2>{attributes.sectionTitle}</h2>
						</div>
						<p><b>{attributes.Titlecontent}</b></p>
						<ul>
                        {slideritems.map((item, index) => (
							<li>
                            {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                            {item.link ? (
                                <a href={item.link} dangerouslySetInnerHTML={{ __html: item.title }}></a>
                            ) : (
                               <p dangerouslySetInnerHTML={{ __html: item.title }}></p>  // Render the title if there's no link
                            )}
                        </li>
							
                        ))}    
						</ul>
					</div>
				</div>
				<div class="col-lg-7">
					<div class="map-sec">
                    {attributes.mapshortcode}	
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
    const { slideritems , sectionTitle, Titlecontent, mapshortcode } = attributes;

   
    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
       setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    

    function addItemSec() {
        const newItem = {
            imgeurl:  urlimage,
            imgealt: '',
            title: 'ul. Kolejowa 5/7, 01-217 Warszawa',
            link: '',
            
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

        <section class="block-row contact-map-sec light-bg">
         <InspectorControls>
            <PanelBody title={stringData.Kontakt_home_block}>
                        <TextControl
                                label={stringData.Section_title}
                                value={attributes.sectionTitle}
                                onChange={(newTitle) => setAttributes({ sectionTitle: newTitle })}
                            />
                             <TextControl
                                label={stringData.Section_heading}
                                value={attributes.Titlecontent}
                                onChange={(innernewTitle) => setAttributes({ Titlecontent: innernewTitle })}
                            />
                {slideritems.map((item, index) => (
                    <div key={index} className="mb-3">
                        <h3>{stringData.Kontakt_list} {index + 1}</h3>
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
                        
                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.remove}</button>
                    </div>
                ))}
                <button onClick={addItemSec} className="button button-primary">{stringData.add_iteme}</button>
                <TextControl
                    label={stringData.Map_shortcode}
                    value={attributes.mapshortcode}
                    onChange={(mapnewTitle) => setAttributes({ mapshortcode: mapnewTitle })}
                />
            </PanelBody>
        </InspectorControls> 
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-5">
					<div class="contact-detail">
						<div class="web-heading">
							<h2>{attributes.sectionTitle}</h2>
						</div>
						<p><b>{attributes.Titlecontent}</b></p>
						<ul>
                        {slideritems.map((item, index) => (
							<li>
                            {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                            {item.link ? (
                                <a href={item.link} dangerouslySetInnerHTML={{ __html: item.title }}></a>
                            ) : (
                               <p dangerouslySetInnerHTML={{ __html: item.title }}></p>  // Render the title if there's no link
                            )}
                        </li>
							
                        ))}    
						</ul>
					</div>
				</div>
				<div class="col-lg-7">
                    {attributes.mapshortcode &&
                      <div class="map-sec">
                      {attributes.mapshortcode}	
                      </div>
                    }
					
				</div>
			</div>
		</div>
	</section>         
    );
}
