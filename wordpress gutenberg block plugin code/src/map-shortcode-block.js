const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl,TextControl } = wp.components;
const { useSelect } = wp.data;
const siteUrl       = myBlockData.siteUrl;
const kelendarz       = myBlockData.kelendarz_url;
const { useState, useEffect } = wp.element;
const stringData = myBlockData.strings;
import ShortcodeContentPreview from './ShortcodeContentPreview'; 



registerBlockType('cwbnamespace/map-shortcode', {
    title: stringData.map_block, 
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
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { postType, selectedCategory } = attributes;
        return (
           <>
              [mapashort_stylethree categoriesslug="{selectedCategory}" ]   
            </>
        );
    },
});

function ImageRepeaterBlockEdit(props) {
    const { setAttributes, attributes } = props;
    const { postType, selectedCategory } = attributes;
   
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

    
    

    const apiCallback   = siteUrl + '/wp-json/blocks-preview-shortvode/v1/mapashort_stylethree-post-type';

    return (
        <>
            <InspectorControls>
                <PanelBody>
                {/* <h3> image {index + 1}</h3>
            {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
            <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Select_an_image}</button> */}
                 
                <div className="tab-content" id="pills-tabContent">
                <SelectControl
                   label={stringData.Select_a_category}
                   value={selectedCategory}
                   options={categoryOptions}
                   onChange={onCategoryChange}
                />
            </div>
                </PanelBody>
            </InspectorControls>
            
            

            
            <ShortcodeContentPreview attributes={attributes} apiCallback={apiCallback}/> 
               
            
        </>
    );
}
