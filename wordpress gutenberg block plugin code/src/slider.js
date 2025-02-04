
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;

registerBlockType('giosnamespace/image-repeater-block', {
    title: stringData.Home_page_banner_slider,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
					title: 'Punkt dla Przyrody',
					button: 'Czytaj więcej',
					link: '#',
					date: '19.06.2023',
				  },
			],
        },
		slideritems: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
					title: 'Znajdź dofinsowanie',
					button: 'DOFINANSOWANIE',
					link: '#',
					
				  },
			],
        },
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { items,slideritems } = attributes;
        return (
      <>   
	<section class="home-main light-bg">
	    <div class="container">		
            <div class="row">
				<div class="col-xl-8 col-lg-6">
					<div class="slider-block">
						<div id="slider-block" class="carousel slide" data-bs-ride="carousel">
						  	<div class="carousel-inner">		
								{items.map((item, index) => (
									
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
									<div class="slider-block-card">
										<div class="slider-img">
                                        {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
										
										</div>
										<div class="slider-block-content">
											<h2>{item.title}</h2>
											<div class="web-btn d-flex align-items-center">
												<a href={item.link} class="btn btn-primary"><span class="visually-hidden">{item.title}</span> {item.button}</a>
												<span>{item.date}</span>
											</div>
										</div>
									</div>
								</div>
								 
							    ))}
                           </div>
						   {items[1] && (
				           	<div class="prev-next-buttons d-flex">
                               <button id="btnPause" class="carousel-control-pause" type="button">
                                     <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
                                         <path d="M14 10V21M19 10V21" stroke="#003399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                     </svg>
                                     <span class="visually-hidden">{stringData.slider_pause}</span>
                             </button>
                             <button id="btnPlay" class="carousel-control-play" type="button" style="display: none;">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                                         <path fill-rule="evenodd" clip-rule="evenodd" d="M0.552786 13.8944C0.214002 13.725 -2.7155e-08 13.3788 -4.37116e-08 13L-5.68248e-07 0.999994C-5.84805e-07 0.621222 0.214002 0.27496 0.552786 0.105567C0.89157 -0.0638247 1.29698 -0.0272694 1.6 0.199994L9.6 6.19999C9.85181 6.38885 10 6.68524 10 6.99999C10 7.31475 9.85181 7.61114 9.6 7.79999L1.6 13.8C1.29698 14.0273 0.89157 14.0638 0.552786 13.8944ZM2 11L7.33333 6.99999L2 2.99999L2 11Z" fill="#003399"/>
                                     </svg>
                                     <span class="visually-hidden">{stringData.slider_play}</span>
                             </button>
                               <button class="custom-control-prev" type="button" data-bs-target="#slider-block" data-bs-slide="prev">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                                     <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z" fill="#003399"/>
                                 </svg>
                                 <span class="visually-hidden">{stringData.slider_Previous}</span>
                               </button>
                               <button class="custom-control-next" type="button" data-bs-target="#slider-block" data-bs-slide="next">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z" fill="#003399"/>
                                 </svg>
                                    <span class="visually-hidden">{stringData.slider_Next}</span>
                               </button>
                           </div>
						  )} 
			            </div>
		            </div>
	           </div>
	           <div class="col-xl-4 col-lg-6">
	              
			   {slideritems.map((item, index) => (
                        <div key={index} className="block-link-sec">
                            <a href={item.link} className="d-flex align-items-center">
                                <div className="icon-sec " aria-hidden="true">
								{item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} alt="icon"/>}
                                </div>
                                <div>
                                    <span>{item.button}</span>
                                    <h2>{item.title}</h2>
                                </div>
                            </a>
                        </div>
						))}


</div>
		</div>
	</div>
</section>
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

    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
        props.setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    function addItem() {
        const newItem = {
            imgeurl: '',
            imgealt: '',
            title: '',
            button: 'Text',
            link: '#',
            date: '',
        };
        props.setAttributes({ items: [...items, newItem] });
    }

    function addItemSec() {
        const newItem = {
            imgeurl: '',
            imgealt: '',
            title: '',
            button: 'Text',
            link: '#',
            date: '',
        };
        props.setAttributes({ slideritems: [...slideritems, newItem] });
    }

    function removeItem(index) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        props.setAttributes({ items: updatedItems });
    }

    function removeSliderItem(index) {
        const updatedSliderItems = [...slideritems];
        updatedSliderItems.splice(index, 1);
        props.setAttributes({ slideritems: updatedSliderItems });
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
	function openMediaLibrarysecond(index) {
        const mediaLibrary = wp.media({
            title: 'Select Image',
            multiple: false,
        });

        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
           
            if (media && media.url) {
                updateSliderItem(index, 'imgeurl', media.url);
                updateItem(index, 'imgealt', media.alt);
            }
        });

        mediaLibrary.open();
    }

    return (
        <section className="home-main light-bg">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-6">
                        <InspectorControls>
                            <PanelBody title={stringData.Repeater_slider}>
                                {items.map((item, index) => (
                                    <div key={index} className="mb-3">
                                        <h3>{stringData.slider} {index + 1}</h3>
                                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                                        <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Select_an_image}</button>

                                        <TextControl
                                            label={stringData.Title}
                                            placeholder={stringData.Enter_a_title}
                                            value={item.title}
                                            onChange={(value) => updateItem(index, 'title', value)}
                                        />
                                        <TextControl
                                            label={stringData.Text_on_the_button}
                                            value={item.button}
                                            onChange={(value) => updateItem(index, 'button', value)}
                                        />
                                        <TextControl
                                            label={stringData.Button_URL}
                                            value={item.link}
                                            onChange={(value) => updateItem(index, 'link', value)}
                                        />
                                        <TextControl
                                             label={stringData.Enter_date}
                                            value={item.date}
                                            onChange={(value) => updateItem(index, 'date', value)}
                                        />
                                        <button onClick={() => removeItem(index)} className="button button-danger">{stringData.remove}</button>
                                    </div>
                                ))}
                                <button onClick={addItem} className="button button-primary">{stringData.Add_a_item}</button>
                            </PanelBody>
                        </InspectorControls>
                        <div className="slider-block">
                            <div id="slider-block" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {items.map((item, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <div className="slider-block-card">
                                                <div className="slider-img">
                                                    {item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                                                </div>
                                                <div className="slider-block-content">
                                                    <h2>{item.title}</h2>
                                                    <div className="web-btn d-flex align-items-center">
                                                        <a href={item.link} className="btn btn-primary">{item.button}</a>
                                                        <span>{item.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <InspectorControls>
                            <PanelBody title= {stringData.sider_block}>
                                {slideritems.map((item, index) => (
                                    <div key={index} className="mb-3">
                                        <h3>{stringData.side_block} {index + 1}</h3>
                                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                                        <button onClick={() => openMediaLibrarysecond(index)} className="button button-secondary">{stringData.Select_an_image}</button>

										<TextControl
                                            label={stringData.Title}
                                            value={item.button}
                                            onChange={(value) => updateSliderItem(index, 'button', value)}
                                        />
										<TextControl
                                            label={stringData.Section_heading}
                                           
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
                                <button onClick={addItemSec} className="button button-primary">{stringData.Add_a_item}</button>
                            </PanelBody>
                        </InspectorControls>
                        {slideritems.map((item, index) => (
                        <div key={index} className="block-link-sec">
                            <a href={item.link} className="d-flex align-items-center">
                                <div className="icon-sec">
								{item.imgeurl && <img src={item.imgeurl} alt={item.imgealt} />}
                                </div>
                                <div>
                                    <span>{item.button}</span>
                                    <h2>{item.title}</h2>
                                </div>
                            </a>
                        </div>
						))}
                    </div>
                </div>
            </div>
        </section>
    );
}
