const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { useSelect } = wp.data;
const siteUrl       = myBlockData.siteUrl;
const kelendarz       = myBlockData.kelendarz_url;
const { useState, useEffect } = wp.element;
const stringData = myBlockData.strings;
import ShortcodeContentPreview from './ShortcodeContentPreview'; 



registerBlockType('cwbnamespace/kalendarz-konsultacji', {
    title: stringData.kalendarz_konsultacji,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        postType: {
            type: 'string',
            default: 'select', // Default post type
        },
        selectedCategory: {
            type: 'string',
            default: '', // Default category
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
              
                [Kalendarz_konsultacji_shortcode post_type="{postType}" categories="{selectedCategory}"]
            </>
        );
    },
});

function ImageRepeaterBlockEdit(props) {
    const { setAttributes, attributes } = props;
    const { postType, selectedCategory } = attributes;

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [postTypeOptions, setPostTypeOptions] = useState([]);

    

    const fetchCategories = async (taxonomyslug) => {
        try {
            let response;

            if (taxonomyslug === 'category') {
                response = await fetch(siteUrl + `/wp-json/wp/v2/categories`);
            } else {
                response = await fetch(siteUrl + `/wp-json/wp/v2/${taxonomyslug}`);
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

    const onPostTypeChange = async (newPostType) => {
        setAttributes({ postType: newPostType, selectedCategory: '' });
        const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
        console.log(taxonomyslug);
        fetchCategories(taxonomyslug);
    };

    const getPostTypeOptions = () => {
        const postTypes = wp.data.select('core').getPostTypes({ per_page: -1 });
        const options = [
            {
                value: '', // Add an empty value for the default option
                label: stringData.Select_Post_Type , // Customize the label for the default option
            },
        ];
    
        if (postTypes && postTypes.length > 0) {
            // console.log(postTypes);
            postTypes.forEach((type) => {
                if (type.slug === 'bookings' || type.slug === 'training_bookings' || type.slug === 'bookings_timings') {
                    options.push({
                        value: type.slug,
                        label: type.labels.singular_name,
                    });
                }
            });
        }
    
        return options;
    };

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
    // const apiCallback   = siteUrl + '/wp-json/blocks-preview-shortvode/v1/get-konsultacji-from-custom-post-type';

    return (
        <div className="tab-block-sec">
            <InspectorControls>
                <PanelBody>
                <div className="tab-content" id="pills-tabContent">
                <SelectControl
                    label={stringData.Selectapost_type}
                    value={postType}
                    options={getPostTypeOptions()}
                    onChange={onPostTypeChange}
                />
                <SelectControl
                    label={stringData.Select_a_category}
                    value={selectedCategory}
                    options={categoryOptions}
                    onChange={onCategoryChange}
                    disabled={!categoryOptions.length}
                />
            </div>
                </PanelBody>
            </InspectorControls>
            {postType && <img src={kelendarz} alt="icon" />}
            {/* <ShortcodeContentPreview attributes={attributes} apiCallback={apiCallback}/>  */}
        </div>
    );
}
