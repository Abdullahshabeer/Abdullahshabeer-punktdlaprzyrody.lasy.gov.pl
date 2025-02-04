const { registerBlockType } = wp.blocks;
const { TextControl, Button,SelectControl, PanelBody } = wp.components;
const { useState } = wp.element;
const siteUrl       = myBlockData.siteUrl;
const { InspectorControls }    = wp.editor;
const stringData = myBlockData.strings;
import ShortcodeContentPreview from './ShortcodeContentPreview'; 

registerBlockType('namespace/posts-list-shortcode', {
  title: stringData.custom_shortcode_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'post',
    },
    postsPerPage: {
      type: 'number',
      default: 5,
    },
    categories: {
      type: 'string',
      default: '',
    },
  },
  edit: CustomShortcodeBlock,
  save: ({ attributes }) => {
    const { postType, postsPerPage, categories } = attributes;

    // Return the shortcode as part of the block content
    return (
      <div className="shortcode-block">
        [get_posts_from_custom_post_type_second post_type="{postType}" posts_per_page="{postsPerPage}" categories="{categories}"]
      </div>
    );
  },
});

function CustomShortcodeBlock(props) {
  const { attributes, setAttributes } = props;
  const { postType, postsPerPage , categories } = attributes;

  const [shortcodeOutput, setShortcodeOutput] = useState(''); // Define shortcodeOutput state

  // Function to execute the shortcode
  const executeShortcode = () => {
    // Execute the shortcode and update the shortcodeOutput
    const shortcode = `[get_posts_from_custom_post_type_second post_type="${postType}" posts_per_page="${postsPerPage}"]`;
    setShortcodeOutput(shortcode);
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
const apiCallback   = siteUrl + '/wp-json/blocks-preview-shortvode/v1/posts-from-custom-post-type-second';

  return (
    <div className="shortcode-block">
        <InspectorControls>
          <PanelBody>
          
          <SelectControl
              label={stringData.select_post_type}
              value={postType}
              options={getPostTypeOptions()}
              onChange={(value) => setAttributes({ postType: value })}
          />
          <TextControl
            label={stringData.categoriese}
            value={categories}
            onChange={(value) => setAttributes({ categories: value })}
          />
          <TextControl
            label={stringData.posts_per_page}
            type="number"
            value={postsPerPage}
            onChange={(value) => setAttributes({ postsPerPage: parseInt(value) })}
          />
          </PanelBody>
        </InspectorControls>
        <ShortcodeContentPreview attributes={attributes} apiCallback={apiCallback}/> 
        <div>
          
        </div>
    </div>
  );
}
