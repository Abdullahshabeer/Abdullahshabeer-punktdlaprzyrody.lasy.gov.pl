const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl,TextControl,CheckboxControl } = wp.components;
const { useSelect } = wp.data;
const siteUrl       = myBlockData.siteUrl;
const kelendarz       = myBlockData.screentshotmap; 
const { useState, useEffect } = wp.element;
const stringData = myBlockData.strings;
import ShortcodeContentPreview from './ShortcodeContentPreview'; 



registerBlockType('cwbnamespace/second-map-shortcode', {
    title: stringData.map_blockt, 
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        selectedCategory: {
            type: 'string',
            default: '', // Default post type
        },
        
        categoryOptions: {
            type: 'array',
            default: [], // Initialize as an empty array
        },
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
        const { postType, selectedCategory, items,upcomingchecbox} = attributes;
        const mapicon = items.map(item => `${item.title}|${item.imgeurl}`).join('^');
        return (
           <>
            [second_stylethree categoriesslug={selectedCategory} mapicon="{mapicon}" upcomingcheckbox = "{attributes.upcomingchecbox.toString()}"]
            </>
        );
    },
});

function ImageRepeaterBlockEdit(props) {
    const { setAttributes, attributes } = props;
    const { postType, items, selectedCategory, upcomingchecbox } = attributes;
   
    const [categoryOptions, setCategoryOptions] = useState([]);
    
    useEffect(() => {
        onPostTypeChange('mapa');
    }, []);
    
    // Function to fetch categories based on taxonomy slug
    const fetchCategories = async (taxonomyslug) => {
        try {
            let response;

            if (taxonomyslug === 'category') {
                response = await fetch(`${siteUrl}/wp-json/wp/v2/categories?per_page=100`);
            } else {
                response = await fetch(`${siteUrl}/wp-json/wp/v2/${taxonomyslug}?per_page=100`);
            }

            if (!response.ok) {
                if (response.status === 404) {
                    setCategoryOptions([]);
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } else {
                const data = await response.json();
                const newCategoryOptions = data.map((category) => ({
                    value: category.id,
                    label: category.name,
                }));
                const categoryOptionsWithDefault = [
                    {
                        value: '',
                        label: stringData.Select_Category ,
                    },
                    ...newCategoryOptions,
                ];
                setCategoryOptions(categoryOptionsWithDefault);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const onCategoryChange = (newCategory) => {
        setAttributes({ selectedCategory: newCategory });
    };

    const onchangefunction = (checkvalue) => {
        setAttributes({ upcomingchecbox: checkvalue }); // Updating upcomingchecbox attribute
    }
       
    

    // Function to get post type options
    const onPostTypeChange = async (newPostType) => {
        setAttributes({ postType: newPostType, selectedCategory: '' });
        const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
        
        fetchCategories(taxonomyslug);
    };

    // Function to get the taxonomy slug for a given post type
    const getTaxonomySlugForPostType = async (postTypeSlug) => {
        try {
            const response = await fetch(siteUrl + `/wp-json/wp/v2/types/${postTypeSlug}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.taxonomies) {
                const taxonomySlug = data.taxonomies[0];
                return taxonomySlug;
            }

            return '';
        } catch (error) {
            console.error('Error fetching taxonomy for post type:', error);
            return '';
        }
    };
    function updateItem(index, key, value) {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        props.setAttributes({ items: updatedItems });
    }

    
    function addItem() {
        const newItem = {
           
            title: 'Communication strategy',
            imgeurl : '',
           
        };
        props.setAttributes({ items: [...items, newItem] });
    }
    if (props.attributes.items.length === 0) {
        props.setAttributes({ items: [{ title: 'Communication strategy', imgeurl : '' }] });
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
            console.log(media);
            if (media && media.url) {
                updateItem(index, 'imgeurl', media.url);
                updateItem(index, 'imgealt', media.alt);
            }
            if(media && media.caption){
                updateItem(index, 'captiondata', media.caption);
            }
        });

        mediaLibrary.open();
    }

    
    

    const apiCallback   = siteUrl + '/wp-json/blocks-preview-shortvode/v1/second_stylethree-post-type';

    return (
        <>
            <InspectorControls>
                <PanelBody>
               
                 
                <div className="tab-content" id="pills-tabContent">
                <SelectControl 
                   label={stringData.Select_a_category}
                   value={selectedCategory}
                   options={categoryOptions}
                   onChange={onCategoryChange}
                />
            </div>
            <div>
            <CheckboxControl
            label= {'Ukryj legendę'}
            checked={upcomingchecbox}
            onChange={(newChecked) => setAttributes({ upcomingchecbox: newChecked })}
            
            
                        />
                    </div>
            {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3>{stringData.repeter} {index + 1}</h3>
                        
                            <TextControl
                                label={stringData.Title}
                                placeholder={stringData.Enter_a_title}
                                value={item.title}
                                onChange={(value) => updateItem(index, 'title', value)}
                            />
                            {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                            <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Select_an_image}</button>
                            <button onClick={() => removeItem(index)} className="button button-danger">{stringData.remove}</button>
                        </div>
                    ))}
                    <button onClick={addItem} className="button button-primary">{stringData.add_item}</button>
                </PanelBody>
            </InspectorControls>
            
            
            <p>{ attributes.upcomingchecbox.toString() }</p>
            <img src={kelendarz} alt="icong" />
            <ShortcodeContentPreview attributes={attributes} apiCallback={apiCallback}/> 
               
            
        </>
    );
}
