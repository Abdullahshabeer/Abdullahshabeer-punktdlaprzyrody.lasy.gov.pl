const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { useSelect } = wp.data;
const siteUrl       = myBlockData.siteUrl;
const kelendarz       = myBlockData.kelendarz_url;
const { useState, useEffect } = wp.element;
const stringData = myBlockData.strings;
import ShortcodeContentPreview from './ShortcodeContentPreview'; 



registerBlockType('cwbnamespace/lista-ekspertw', {
    title: stringData.Lista_Ekspertw,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        postType: {
            type: 'string',
            default: 'select', // Default post type
        },
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { postType, selectedCategory } = attributes;
        return (
           <>
                [Lista_Ekspertw_shortcode post_type="{postType}" ]
            </>
        );
    },
});

function ImageRepeaterBlockEdit(props) {
    const { setAttributes, attributes } = props;
    const { postType } = attributes;

   

    const onPostTypeChange = async (newPostType) => {
        setAttributes({ postType: newPostType});
       
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
                if (type.slug && type.slug!== 'page' && type.slug!== 'attachment' && type.slug!== 'wp_template'&& type.slug!== 'wp_template_part'&& type.slug!== 'wp_navigation'&& type.slug!== 'wp_block'&& type.slug!== 'nav_menu_item') {
                options.push({
                    value: type.slug,
                    label: type.labels.singular_name,
                });
            }
            });
        }
    
        return options;
    };

    
    const apiCallback   = siteUrl + '/wp-json/blocks-preview-shortvode/v1/Lista-Ekspertw-from-custom-post-type';

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
            </div>
                </PanelBody>
            </InspectorControls>
            
            <ShortcodeContentPreview attributes={attributes} apiCallback={apiCallback}/> 
        </div>
    );
}
