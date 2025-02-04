/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Kalendarz-block.js":
/*!********************************!*\
  !*** ./src/Kalendarz-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl
} = wp.components;
const {
  useSelect
} = wp.data;
const {
  useState,
  useEffect
} = wp.element;
const siteUrl = myBlockData.siteUrl;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/kalendarz', {
  title: stringData.kalendarz,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    }
  },

  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[montyley_kalandarz_shortcode post_type=\"", postType, "\" categories=\"", selectedCategory, "\"]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  // useEffect(() => {
  //     // Fetch post type options when the component mounts
  //     getPostTypeOptions().then((options) => {
  //         setPostTypeOptions(options);
  //     });
  // }, []); // Empty dependency array to run the effect only once

  const fetchCategories = async taxonomyslug => {
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
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };
  const getTaxonomySlugForPostType = async postTypeSlug => {
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
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/get-kalandarz-from-custom-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-block-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange,
    disabled: !categoryOptions.length
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }));
}

/***/ }),

/***/ "./src/Kalendarz-konsultacji-block.js":
/*!********************************************!*\
  !*** ./src/Kalendarz-konsultacji-block.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.kelendarz_url;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/kalendarz-konsultacji', {
  title: stringData.kalendarz_konsultacji,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    }
  },

  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[Kalendarz_konsultacji_shortcode post_type=\"", postType, "\" categories=\"", selectedCategory, "\"]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);
  const fetchCategories = async taxonomyslug => {
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
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    console.log(taxonomyslug);
    fetchCategories(taxonomyslug);
  };
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug === 'bookings' || type.slug === 'newpost' || type.slug === 'bookings_timings') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };
  const getTaxonomySlugForPostType = async postTypeSlug => {
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

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-block-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange,
    disabled: !categoryOptions.length
  })))), postType && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: kelendarz,
    alt: "icon"
  }));
}

/***/ }),

/***/ "./src/Lista-Ekspertw.js":
/*!*******************************!*\
  !*** ./src/Lista-Ekspertw.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.kelendarz_url;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/lista-ekspertw', {
  title: stringData.Lista_Ekspertw,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'select' // Default post type
    }
  },

  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[Lista_Ekspertw_shortcode post_type=\"", postType, "\" ]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType
  } = attributes;
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType
    });
  };
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/Lista-Ekspertw-from-custom-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-block-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }));
}

/***/ }),

/***/ "./src/Point-for-Nature.js":
/*!*********************************!*\
  !*** ./src/Point-for-Nature.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  SelectControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/point-of-nature', {
  title: stringData.point_of_nature,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        content: 'KONSULTACJE',
        button: '',
        buttonurl: '#'
      }]
    },
    sectionTitle: {
      type: 'string',
      default: ''
    },
    sectionstyle: {
      type: 'string',
      default: 'style1'
    },
    sectioncolor: {
      type: 'string',
      default: ''
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      sectionTitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `scheme-block ${attributes.sectionstyle === 'style1' ? 'light-bg' : ''}`,
      style: {
        background: attributes.sectioncolor
      }
    }, attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "scheme-wrap"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "scheme-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon",
      style: {
        background: attributes.sectioncolor
      }
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "scheme-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: item.content
      }
    }), item.button && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.buttonurl
    }, item.button, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "8",
      height: "14",
      viewBox: "0 0 8 14",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
      stroke: "#003399",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems,
    sectionTitle
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  function addItemSec() {
    const newItem = {
      imgeurl: '',
      imgealt: '',
      content: 'KONSULTACJE'
    };
    setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: stringData.Select_an_image,
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.nature
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Section_title,
    value: attributes.sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.nature_style,
    value: attributes.sectionstyle,
    options: [{
      value: 'style1',
      label: stringData.style + '1'
    }, {
      value: 'style2',
      label: stringData.style + '2'
    }],
    onChange: newTitle => setAttributes({
      sectionstyle: newTitle
    })
  }), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.shortcuts_blockty, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.content,
    onChange: value => updateSliderItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.button_text,
    value: item.button,
    onChange: value => updateSliderItem(index, 'button', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_URL,
    value: item.buttonurl,
    onChange: value => updateSliderItem(index, 'buttonurl', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_iteme), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Background_color,
    value: attributes.sectioncolor,
    onChange: newTitle => setAttributes({
      sectioncolor: newTitle
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `scheme-block ${attributes.sectionstyle === 'style1' ? 'light-bg' : ''}`,
    style: {
      background: attributes.sectioncolor
    }
  }, attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "scheme-wrap"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "scheme-row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon",
    style: {
      background: attributes.sectioncolor
    }
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "scheme-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: item.content
    }
  }), item.button && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.buttonurl
  }, item.button, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
    stroke: "#003399",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })))))))));
}

/***/ }),

/***/ "./src/ShortcodeContentPreview.js":
/*!****************************************!*\
  !*** ./src/ShortcodeContentPreview.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function ShortcodeContentPreview({
  attributes,
  apiCallback
}) {
  const {
    postType,
    postsPerPage,
    categoryID,
    selectedCategory,
    displayFilters,
    postperpage,
    upcomingchecbox,
    categories
  } = attributes;
  const [content, setContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  //  console.log(attributes);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Make an AJAX request to fetch the content generated by the shortcode
    const fetchContent = async () => {
      try {
        const response = await fetch(apiCallback, {
          method: 'POST',
          // Use the appropriate HTTP method
          body: JSON.stringify({
            postType,
            // Use postType from attributes
            postsPerPage,
            // Use postsPerPage from attributes
            upcomingchecbox,
            // Use upcomingchecbox from attributes
            categories,
            categoryID,
            selectedCategory,
            displayFilters,
            postperpage
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error(error);
        setContent('Failed to fetch content');
      }
    };
    fetchContent();
  }, [upcomingchecbox, categories, postType, postsPerPage, categoryID, displayFilters, postperpage, selectedCategory]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "shortcode-content-preview"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: content
    }
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (ShortcodeContentPreview);

/***/ }),

/***/ "./src/Shortcuts-block.js":
/*!********************************!*\
  !*** ./src/Shortcuts-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/shortcutblock', {
  title: stringData.shortcuts_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'KONSULTACJE',
        button: 'Nunc vitae venenatis lectus. Morbi dictum sapien et odio fermentum condimentum. Integer consectetur lorem nec arcu bibendum consectetur. ',
        link: '#'
      }]
    },
    sectionTitle: {
      type: 'string',
      default: 'Na skróty'
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      sectionTitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: "block-row shortcuts-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "shortcuts-sec-wrap light-bg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "shortcuts-cards"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      class: "col-xl-3 col-lg-6 col-md-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "shortcuts-card"
    }, item.link ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card-icon"
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.button, " ")) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card-icon"
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.button, " ")))))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems,
    sectionTitle
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  function addItemSec() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      title: 'KONSULTACJE',
      button: 'Nunc vitae venenatis lectus. Morbi dictum sapien et odio fermentum condimentum. Integer consectetur lorem nec arcu bibendum consectetur. ',
      link: '#'
    };
    setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: "block-row shortcuts-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.shortcuts_Repeater
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Section_title,
    value: attributes.sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.shortcuts_blocker, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.enter_url,
    value: item.link,
    onChange: value => updateSliderItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.description,
    value: item.button,
    onChange: value => updateSliderItem(index, 'button', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_itemy))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "shortcuts-sec-wrap light-bg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "shortcuts-cards"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    class: "col-xl-3 col-lg-6 col-md-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "shortcuts-card"
  }, item.link ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-icon"
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.button, " ")) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-icon"
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.button, " "))))))))));
}

/***/ }),

/***/ "./src/Tab-post-block.js":
/*!*******************************!*\
  !*** ./src/Tab-post-block.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  CheckboxControl,
  RadioControl,
  SelectControl
} = wp.components;
const stringData = myBlockData.strings;
const siteUrl = myBlockData.siteUrl;
const {
  useState,
  useEffect
} = wp.element;
const urlimage = myBlockData.defaultimge;

registerBlockType('cwbnamespace/tab-post-block', {
  title: stringData.file_Tab,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    tabs: {
      type: 'array',
      default: [{
        title: '',
        postType: 'newpost',
        upcomingchecbox: '',
        categories: '',
        postsPerPage: 5
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      tabs
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tab-block-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "nav nav-pills align-items-center",
      id: "pills-tab",
      role: "tablist"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      className: "tab-heading"
    }, "Wy\u015Bwietlaj szkolenia:"), tabs.map((tab, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: index,
      className: "nav-item",
      role: "presentation"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `nav-link ${index === 0 ? 'active' : ''}`,
      id: `tab-btn-${index + 1}`,
      "data-bs-toggle": "pill",
      "data-bs-target": `#tab-${index + 1}`,
      type: "button",
      role: "tab",
      "aria-controls": `tab-${index + 1}`,
      "aria-selected": index === 0
    }, tab.title)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tab-content",
      id: "pills-tabContent"
    }, tabs.map((tab, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `tab-pane fade show ${index === 0 ? 'active' : ''}`,
      id: `tab-${index + 1}`,
      role: "tabpanel",
      "aria-labelledby": `tab-btn-${index + 1}`,
      tabIndex: "0"
    }, "[get_posts_from_custom_post_type post_type=\"", tab.postType, "\" posts_per_page=\"", tab.postsPerPage, "\" upcoming_post=\"", tab.upcomingchecbox, "\" categories=\"", tab.categories, "\"]"))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    tabs
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);
  function updateTabAttribute(index, key, value) {
    const updatedTabs = [...tabs];
    updatedTabs[index][key] = value;
    props.setAttributes({
      tabs: updatedTabs
    });
  }
  function addTab() {
    const newTab = {
      title: '',
      postType: 'post',
      upcomingchecbox: '',
      categories: '',
      postsPerPage: 5
    };
    props.setAttributes({
      tabs: [...tabs, newTab]
    });
  }
  function removeTab(index) {
    const updatedTabs = [...tabs];
    updatedTabs.splice(index, 1);
    props.setAttributes({
      tabs: updatedTabs
    });
  }
  const fetchCategories = async (taxonomyslug, tabIndex) => {
    try {
      let response;
      if (taxonomyslug === 'category') {
        response = await fetch(siteUrl + `/wp-json/wp/v2/categories`);
      } else {
        response = await fetch(siteUrl + `/wp-json/wp/v2/${taxonomyslug}`);
      }
      if (!response.ok) {
        if (response.status === 404) {
          // Handle not found response
          updateCategoryOptions([], tabIndex);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        updateCategoryOptions(categoryOptionsWithDefault, tabIndex);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const updateCategoryOptions = (options, tabIndex) => {
    const updatedCategoryOptions = [...categoryOptions];
    updatedCategoryOptions[tabIndex] = options;
    setCategoryOptions(updatedCategoryOptions);
  };
  const onCategoryChange = (newCategory, tabIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].categories = newCategory;
    setAttributes({
      tabs: updatedTabs
    });
  };
  const onPostTypeChange = async (newPostType, tabIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].postType = newPostType;
    updatedTabs[tabIndex].selectedCategory = '';
    setAttributes({
      tabs: updatedTabs
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug, tabIndex);
  };
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };
  const getTaxonomySlugForPostType = async postTypeSlug => {
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
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/posts-from-custom-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-block-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Tab_Block
  }, tabs.map((tab, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.Zakdka, " ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: tab.title,
    onChange: value => updateTabAttribute(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.select_post_type,
    value: tab.postType,
    options: getPostTypeOptions(),
    onChange: value => onPostTypeChange(value, index)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.categoriese,
    value: tab.categories,
    options: categoryOptions[index] || [],
    onChange: value => onCategoryChange(value, index),
    disabled: !categoryOptions[index] || categoryOptions[index].length === 0
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.posts_per_page,
    type: "number",
    value: tab.postsPerPage,
    onChange: value => updateTabAttribute(index, 'postsPerPage', parseInt(value))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RadioControl, {
    label: stringData.Select_product,
    selected: tab.upcomingchecbox,
    options: [{
      label: stringData.upcoming,
      value: 'upcoming'
    }, {
      label: stringData.completed,
      value: 'completed'
    }],
    onChange: value => updateTabAttribute(index, 'upcomingchecbox', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeTab(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addTab,
    className: "button button-primary"
  }, stringData.add_tab))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nav nav-pills align-items-center",
    id: "pills-tab",
    role: "tablist"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "tab-heading"
  }, stringData.Wyświetlaj), tabs.map((tab, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: index,
    className: "nav-item",
    role: "presentation"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `nav-link ${index === 0 ? 'active' : ''}`,
    id: `tab-btn-${index + 1}`,
    "data-bs-toggle": "pill",
    "data-bs-target": `#tab-${index + 1}`,
    type: "button",
    role: "tab",
    "aria-controls": `tab-${index + 1}`,
    "aria-selected": index === 0
  }, tab.title)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, tabs.map((tab, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: `tab-pane fade show ${index === 0 ? 'active' : ''}`,
    id: `tab-${index + 1}`,
    role: "tabpanel",
    "aria-labelledby": `tab-btn-${index + 1}`,
    tabIndex: "0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: tab // Pass the tab's attributes to ShortcodeContentPreview
    ,
    apiCallback: apiCallback
  })))));
}

/***/ }),

/***/ "./src/Team-all-post.js":
/*!******************************!*\
  !*** ./src/Team-all-post.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl
} = wp.components;
const {
  useSelect
} = wp.data;
const {
  useState,
  useEffect
} = wp.element;
const siteUrl = myBlockData.siteUrl;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/teampost', {
  title: stringData.team,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    },

    postperpage: {
      type: 'number',
      default: ''
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory,
      postperpage
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[display_publications_Team post_type=\"", postType, "\" category=\"", selectedCategory, "\" posts_per_page=\"", postperpage, "\"]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory,
    postperpage
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  // useEffect(() => {
  //     // Fetch post type options when the component mounts
  //     getPostTypeOptions().then((options) => {
  //         setPostTypeOptions(options);
  //     });
  // }, []); // Empty dependency array to run the effect only once

  const fetchCategories = async taxonomyslug => {
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
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };
  const getTaxonomySlugForPostType = async postTypeSlug => {
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
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/publications-Team-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-block-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange,
    disabled: !categoryOptions.length
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_per_page,
    value: attributes.postperpage ? attributes.postperpage.toString() : '',
    onChange: newTitle => setAttributes({
      postperpage: newTitle
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }));
}

/***/ }),

/***/ "./src/add-title-block.js":
/*!********************************!*\
  !*** ./src/add-title-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  PanelBody,
  SelectControl,
  TextControl,
  CheckboxControl
} = wp.components;
const {
  InspectorControls
} = wp.editor;
const stringData = myBlockData.strings;
wp.blocks.registerBlockType('giosnamespace/heading-block', {
  title: stringData.Section_heading,
  icon: 'heading',
  category: 'my-custom-category',
  attributes: {
    sectionTitle: {
      type: 'string',
      default: stringData.enter_headingg
    },
    headings: {
      type: 'string',
      default: ''
    },
    selectheading: {
      type: 'string',
      default: 'h1'
    },
    upcomingchecbox: {
      type: 'boolean',
      default: false
    }
  },
  edit: HeadingBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      headingText,
      selectheading,
      sectionTitle,
      upcomingchecbox
    } = attributes;
    const headingTag = selectheading || 'h1';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (upcomingchecbox ? " heading-divider" : "")
    }, headingTag !== '' && React.createElement(headingTag, {
      className: sectionTitle
    }, sectionTitle));
  }
});
function HeadingBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    headingText,
    selectheading,
    sectionTitle,
    upcomingchecbox
  } = attributes;
  const headingTag = selectheading || 'h1';
  function updateHeadingText(newText) {
    setAttributes({
      headingText: newText
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    value: selectheading,
    options: [{
      value: '',
      label: stringData.heading_style
    }, {
      value: 'h1',
      label: stringData.Heading + '1'
    }, {
      value: 'h2',
      label: stringData.Heading + '2'
    }, {
      value: 'h3',
      label: stringData.Heading + '3'
    }, {
      value: 'h4',
      label: stringData.Heading + '4'
    }, {
      value: 'h5',
      label: stringData.Heading + '5'
    }, {
      value: 'h6',
      label: stringData.Heading + '6'
    }],
    onChange: newStyle => setAttributes({
      selectheading: newStyle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiont,
    value: sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (upcomingchecbox ? " heading-divider" : "")
  }, headingTag !== '' && React.createElement(headingTag, {
    className: sectionTitle
  }, sectionTitle)));
}

/***/ }),

/***/ "./src/contact-block.js":
/*!******************************!*\
  !*** ./src/contact-block.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextareaControl,
  TextControl,
  SelectControl,
  CheckboxControl
} = wp.components;
const {
  useState
} = wp.element;
const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;
registerBlockType('eprojektynamespace/benefits', {
  title: stringData.contact_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [{
        sectiontitle: 'Dane kontaktowe',
        upcomingchecbox: false,
        selectheading: '',
        sectioncontent: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis mauris sed sem lobortis, vitae dignissim urna ',
        coloumnsize: 6,
        nestedItems: [],
        // An array for nested items
        shortcode: ''
      }]
    },
    postsectiontitle: {
      type: 'string',
      default: ''
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files,
      postsectiontitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "kontakt-osoby-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: `col-lg-${file.coloumnsize}`,
      key: parentIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "kontakt-osoby-card light-bg"
    }, file.sectiontitle && (file.selectheading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
    }, file.selectheading && React.createElement(file.selectheading, {
      className: file.sectiontitle
    }, file.sectiontitle)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, " ", file.sectiontitle))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "contact-detail"
    }, file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.sectioncontent), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: "icon"
    }), nestedItem.url ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: nestedItem.url,
      dangerouslySetInnerHTML: {
        __html: nestedItem.title
      }
    }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      dangerouslySetInnerHTML: {
        __html: nestedItem.title
      }
    }))))), file.shortcode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "map-sec"
    }, file.shortcode)))))));
  }
});
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files,
    postsectiontitle
  } = attributes;
  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].imgalt = media.alt;
      setAttributes({
        files: newFiles
      });
    }
  };
  const addFile = parentIndex => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: 'podwyższenie skuteczności opieki medycznej i jakości usług medycznych świadczonych w regionie,',
      url: '',
      imgalt: '',
      fileUrl: imgurl,
      fileName: '',
      fileSize: 0
    });
    setAttributes({
      files: newFiles
    });
  };
  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  const removeImage = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems[childIndex].fileUrl = ''; // Remove the image URL
    setAttributes({
      files: newFiles
    });
  };
  const addSection = () => {
    setAttributes({
      files: [...files, {
        sectiontitle: 'Dane kontaktowe',
        upcomingchecbox: false,
        selectheading: '',
        sectioncontent: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis mauris sed sem lobortis, vitae dignissim urna ',
        coloumnsize: 6,
        nestedItems: [],
        // An array for nested items
        shortcode: ''
      }]
    });
  };
  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "kontakt-osoby-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.contact_block
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "text",
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: file.sectiontitle,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].sectiontitle = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    className: "margintop",
    value: file.selectheading || 'h1',
    options: [{
      value: 'h1',
      label: stringData.Heading + '1'
    }, {
      value: 'h2',
      label: stringData.Heading + '2'
    }, {
      value: 'h3',
      label: stringData.Heading + '3'
    }, {
      value: 'h4',
      label: stringData.Heading + '4'
    }, {
      value: 'h5',
      label: stringData.Heading + '5'
    }, {
      value: 'h6',
      label: stringData.Heading + '6'
    }],
    onChange: newStyle => {
      const newFiles = [...files];
      newFiles[parentIndex].selectheading = newStyle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: file.upcomingchecbox,
    onChange: newChecked => {
      const newFiles = [...files];
      newFiles[parentIndex].upcomingchecbox = newChecked;
      setAttributes({
        files: newFiles
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    placeholder: stringData.Enter_a_description,
    label: stringData.description,
    value: file.sectioncontent,
    onChange: newContent => {
      const newFiles = [...files];
      newFiles[parentIndex].sectioncontent = newContent;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "text",
    label: stringData.Column_size,
    value: file.coloumnsize,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].coloumnsize = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop aad-a-e-e-bdbbc-1v57ksj"
  }, stringData.Nested_rowr), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "nested-item mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "text",
    placeholder: stringData.Title,
    label: stringData.description,
    value: nestedItem.title,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].title = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "text",
    placeholder: stringData.enter_urlrt,
    label: stringData.addlink,
    value: nestedItem.url,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].url = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, parentIndex, childIndex),
    type: "file",
    value: nestedItem.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "list-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: "icon"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2 mt-3"
    }, stringData.select_icon), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger me-2",
      onClick: () => removeImage(parentIndex, childIndex)
    }, stringData.delete_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger me-2",
      onClick: () => removeFile(parentIndex, childIndex)
    }, stringData.delete_point)))
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => addFile(parentIndex),
    className: "button button-primary"
  }, stringData.point)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeSection(parentIndex)
  }, stringData.usun_sekcje)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.mapshortcode,
    value: file.shortcode,
    onChange: newContent => {
      const newFiles = [...files];
      newFiles[parentIndex].shortcode = newContent;
      setAttributes({
        files: newFiles
      });
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addSection,
    className: "button button-primary"
  }, stringData.add_sectit)))), files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: `col-lg-${file.coloumnsize}`,
    key: parentIndex
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "kontakt-osoby-card light-bg"
  }, file.sectiontitle && (file.selectheading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
  }, file.selectheading && React.createElement(file.selectheading, {
    className: file.sectiontitle
  }, file.sectiontitle)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, " ", file.sectiontitle))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "contact-detail"
  }, file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.sectioncontent), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: nestedItem.fileUrl,
    alt: "icon"
  }), nestedItem.url ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: nestedItem.url,
    dangerouslySetInnerHTML: {
      __html: nestedItem.title
    }
  }) : nestedItem.title)))), file.shortcode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "map-sec"
  }, file.shortcode)))))));
}

/***/ }),

/***/ "./src/contactmapblock.js":
/*!********************************!*\
  !*** ./src/contactmapblock.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/contactmap', {
  title: stringData.Kontakt_home_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'ul. Kolejowa 5/7, 01-217 Warszawa',
        link: ''
      }]
    },
    sectionTitle: {
      type: 'string',
      default: 'Kontakt'
    },
    Titlecontent: {
      type: 'string',
      default: 'Centrum Wsparcia Beneficjenta'
    },
    mapshortcode: {
      type: 'string',
      default: ''
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      sectionTitle,
      Titlecontent,
      mapshortcode
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: "block-row contact-map-sec light-bg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-5"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "contact-detail"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, attributes.Titlecontent)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    }), item.link ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      dangerouslySetInnerHTML: {
        __html: item.title
      }
    }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: item.title
      }
    }) // Render the title if there's no link
    ))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-7"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "map-sec"
    }, attributes.mapshortcode))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems,
    sectionTitle,
    Titlecontent,
    mapshortcode
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  function addItemSec() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      title: 'ul. Kolejowa 5/7, 01-217 Warszawa',
      link: ''
    };
    setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: "block-row contact-map-sec light-bg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Section_title,
    value: attributes.sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Section_heading,
    value: attributes.Titlecontent,
    onChange: innernewTitle => setAttributes({
      Titlecontent: innernewTitle
    })
  }), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.Kontakt_list, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.enter_url,
    value: item.link,
    onChange: value => updateSliderItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_iteme), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Map_shortcode,
    value: attributes.mapshortcode,
    onChange: mapnewTitle => setAttributes({
      mapshortcode: mapnewTitle
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "contact-detail"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, attributes.Titlecontent)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  }), item.link ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link,
    dangerouslySetInnerHTML: {
      __html: item.title
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: item.title
    }
  }) // Render the title if there's no link
  ))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-7"
  }, attributes.mapshortcode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "map-sec"
  }, attributes.mapshortcode)))));
}

/***/ }),

/***/ "./src/download-file-block.js":
/*!************************************!*\
  !*** ./src/download-file-block.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody
} = wp.components;
const stringData = myBlockData.strings;
registerBlockType('makeupnamespace/download-file-block', {
  title: stringData.download_file_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [{
        title: 'TYTUŁ',
        fileUrl: '',
        fileName: '',
        fileSize: 0
      }]
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, files.map((file, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-sec",
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: file.fileUrl,
      class: "d-flex align-items-center",
      download: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "22",
      viewBox: "0 0 20 22",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20",
      stroke: "#003399",
      "stroke-width": "3",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.title, " [", file.fileName, ", ", file.fileSize, "]"))))));
  }
});
const {
  useState
} = wp.element;
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;

  // const onSelectFile = (media, index) => {
  //   if (media && media.url) {
  //       console.log(media);
  //     const newFiles = [...files];
  //     newFiles[index].fileUrl = media.url;
  //     newFiles[index].fileSize = media.filesizeHumanReadable;
  //     newFiles[index].fileName = media.subtype;
  //     newFiles[index].filetitle = media.filename;
  //     setAttributes({ files: newFiles });
  //   }
  // };
  const onSelectFile = (media, index) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[index].fileUrl = media.url;
      newFiles[index].fileSize = media.filesizeHumanReadable;
      newFiles[index].filetitle = media.filename;

      // Extract the file extension from the filename (get the last part after the last dot)
      const fileExtension = media.filename.split('.').pop();
      newFiles[index].fileName = fileExtension;
      setAttributes({
        files: newFiles
      });
    }
  };
  const addFile = () => {
    setAttributes({
      files: [...files, {
        title: 'TYTUŁ',
        fileUrl: '',
        fileName: '',
        filetitle: '',
        fileSize: 0
      }]
    });
  };
  const removeFile = index => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.File_Block_Settings
  }, files.map((file, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.Title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: file.title,
    className: "form-control",
    onChange: e => {
      const newFiles = [...files];
      newFiles[index].title = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "margin-top"
  }, " "), file.filetitle && stringData.filename, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "margin-top"
  }, file.filetitle, " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, index),
    type: "file",
    value: file.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2"
    }, file.fileUrl ? stringData.Change_file : stringData.choose_a_file), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger",
      onClick: () => removeFile(index)
    }, stringData.delete_file)))
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addFile,
    className: "button button-primary"
  }, stringData.file_new_file)))), files.map((file, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-sec",
    key: index
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: file.fileUrl,
    class: "d-flex align-items-center",
    download: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "22",
    viewBox: "0 0 20 22",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20",
    stroke: "#003399",
    "stroke-width": "3",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.title, " [", file.fileName, ", ", file.fileSize, "]"))))));
}

/***/ }),

/***/ "./src/fancy-gallery.js":
/*!******************************!*\
  !*** ./src/fancy-gallery.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  SelectControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/gallery-block', {
  title: stringData.newgallerty,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        captiondata: ''
      }]
    },
    postsectiontitle: {
      type: 'string',
      default: stringData.Heading
    },
    columentvalue: {
      type: 'string',
      default: ''
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      postsectiontitle,
      columentvalue
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "gallery-grid-block"
    }, postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "fancybox-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: ` col-md-4 ${columentvalue ? `col-lg-${columentvalue}` : 'col-lg-6'}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.imgeurl,
      "data-fancybox": "gallery-grid",
      "data-caption": item.captiondata
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    postsectiontitle,
    columentvalue
  } = props.attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  function addItem() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      captiondata: ''
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      console.log(media);
      if (media && media.url) {
        updateItem(index, 'imgeurl', media.url);
        updateItem(index, 'imgealt', media.alt);
      }
      if (media && media.caption) {
        updateItem(index, 'captiondata', media.caption);
      }
    });
    mediaLibrary.open();
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "gallery-grid-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.add_images_gallery
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiont,
    value: postsectiontitle,
    onChange: newTitle => props.setAttributes({
      postsectiontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.columnvalue,
    value: columentvalue,
    options: [{
      label: ' 2',
      value: '6'
    }, {
      label: ' 3',
      value: '4'
    }, {
      label: ' 4',
      value: '3'
    }],
    onChange: newOption => props.setAttributes({
      columentvalue: newOption
    })
  }), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, " ", stringData.image, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.add_itemfanc))), postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "fancybox-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ` col-md-4 ${columentvalue ? `col-lg-${columentvalue}` : 'col-lg-6'}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.imgeurl,
    "data-fancybox": "gallery-grid",
    "data-caption": item.captiondata
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })))))));
}

/***/ }),

/***/ "./src/harmonogram-block.js":
/*!**********************************!*\
  !*** ./src/harmonogram-block.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.kelendarz_url;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/harmonogram-block', {
  title: stringData.harmonogram_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    }
  },

  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[harmongram_shortcode post_type=\"", postType, "\" categories=\"", selectedCategory, "\"]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  // Function to fetch categories based on taxonomy slug
  const fetchCategories = async taxonomyslug => {
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
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };

  // Function to get post type options
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };

  // Function to get the taxonomy slug for a given post type
  const getTaxonomySlugForPostType = async postTypeSlug => {
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

  // Initialize state when component mounts
  useEffect(() => {
    const initializeState = async () => {
      const options = getPostTypeOptions();
      setPostTypeOptions(options);
      if (postType && postType !== 'select') {
        const taxonomyslug = await getTaxonomySlugForPostType(postType);
        fetchCategories(taxonomyslug);
      }
    };
    initializeState();
  }, []);
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/get-harmongram-custom-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-block-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }));
}

/***/ }),

/***/ "./src/icon-heading-block.js":
/*!***********************************!*\
  !*** ./src/icon-heading-block.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/icon-heading-block', {
  title: stringData.icon_heading_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'Znajdź dofinsowanie',
        content: 'DOFINANSOWANIE'
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-icon-lists"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      class: "list-row d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "list-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content)))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    slideritems
  } = props.attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    props.setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  function addItemSec() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      title: 'Znajdź dofinsowanie',
      content: 'DOFINANSOWANIE'
    };
    props.setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    props.setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-icon-lists"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.icon_heading_blocktitl
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.side_blocky, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.description,
    value: item.content,
    onChange: value => updateSliderItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.Add_a_item))), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    class: "list-row d-flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "list-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content)))));
}

/***/ }),

/***/ "./src/map-shortcode-block.js":
/*!************************************!*\
  !*** ./src/map-shortcode-block.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.kelendarz_url;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/map-shortcode', {
  title: stringData.map_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    selectedCategory: {
      type: 'string',
      default: '' // Default post type
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    }
  },

  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[mapashort_stylethree categoriesslug=\"", selectedCategory, "\" ]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    onPostTypeChange('mapa');
  }, []);

  // Function to fetch categories based on taxonomy slug
  const fetchCategories = async taxonomyslug => {
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
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };

  // Function to get post type options
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };

  // Function to get the taxonomy slug for a given post type
  const getTaxonomySlugForPostType = async postTypeSlug => {
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
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/mapashort_stylethree-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }));
}

/***/ }),

/***/ "./src/naborye-section-block.js":
/*!**************************************!*\
  !*** ./src/naborye-section-block.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  SelectControl,
  CheckboxControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/section-repeter-block', {
  title: stringData.image_section_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: []
    },
    selectdesign: {
      type: 'array',
      default: [{
        value: '',
        // Unique value for style1
        label: stringData.selected_image_side
      }, {
        value: 'left',
        // Unique value for style1
        label: stringData.Left
      }, {
        value: 'right',
        // Unique value for style1
        label: stringData.Rignt
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems,
      selectdesign,
      upcomingchecbox
    } = attributes;
    const {
      selectheading
    } = items;
    const headingTag = selectheading || 'h1';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "quiz-contain"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-with-image light-bg",
      style: {
        background: item.color
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `col-lg-${item.imgeurl ? '7' : '12'}`
    }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (item.upcomingchecbox ? " heading-divider" : "")
    }, item.selectheading && React.createElement(item.selectheading, {
      className: item.sectionTitle
    }, item.sectionTitle)), item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: item.content
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null), item.innerbutton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-btn text-end"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      className: "btn btn-primary"
    }, item.innerbutton))), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-5"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-img"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    }))))), item.button && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.linkexternal,
      className: "btn btn-primary"
    }, item.button))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    items,
    selectdesign
  } = attributes;
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        imgeurl: urlimage,
        style: '',
        color: '#eef3ff',
        content: 'W celu wspólnej realizacji projektu, w zakresie określonym przez instytucję zarządzającą krajowym programem albo instytucję zarządzającą regionalnym programem, może zostać utworzone partnerstwo przez podmioty wnoszące do projektu zasoby ludzkie, organizacyjne, techniczne lub finansowe, realizujące wspólnie projekt, zwany dalej „projektem partnerskim”, na warunkach określonych w porozumieniu albo umowie o partnerstwie',
        innerbutton: '',
        button: '',
        link: '#',
        linkexternal: '',
        upcomingchecbox: false,
        selectheading: 'h1',
        headings: '',
        sectionTitle: stringData.enter_heading
      }]
    });
  }
  function addItem(index) {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      style: '',
      color: '#eef3ff',
      content: 'W celu wspólnej realizacji projektu, w zakresie określonym przez instytucję zarządzającą krajowym programem albo instytucję zarządzającą regionalnym programem, może zostać utworzone partnerstwo przez podmioty wnoszące do projektu zasoby ludzkie, organizacyjne, techniczne lub finansowe, realizujące wspólnie projekt, zwany dalej „projektem partnerskim”, na warunkach określonych w porozumieniu albo umowie o partnerstwie',
      innerbutton: '',
      button: '',
      link: '#',
      linkexternal: '',
      upcomingchecbox: false,
      selectheading: 'h1',
      headings: '',
      sectionTitle: stringData.enter_heading
    };
    return newItem;
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setAttributes({
      items: updatedItems
    });
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: stringData.Select_an_image,
      multiple: false
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
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    setAttributes({
      items: updatedItems
    });
  }
  function addNewBlock() {
    const newItems = [...items, addItem(items.length)];
    setAttributes({
      items: newItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.image_block
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "section ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    value: item.selectheading || 'h1',
    options: [{
      value: 'h1',
      label: stringData.Heading + '1'
    }, {
      value: 'h2',
      label: stringData.Heading + '2'
    }, {
      value: 'h3',
      label: stringData.Heading + '3'
    }, {
      value: 'h4',
      label: stringData.Heading + '4'
    }, {
      value: 'h5',
      label: stringData.Heading + '5'
    }, {
      value: 'h6',
      label: stringData.Heading + '6'
    }],
    onChange: newStyle => updateItem(index, 'selectheading', newStyle)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiont,
    value: item.sectionTitle,
    onChange: newTitle => updateItem(index, 'sectionTitle', newTitle)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: item.upcomingchecbox,
    onChange: newChecked => updateItem(index, 'upcomingchecbox', newChecked)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    label: stringData.Enter_a_description,
    placeholder: stringData.Enter_a_description,
    value: item.content,
    onChange: value => updateItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Background_color,
    value: item.color,
    onChange: value => updateItem(index, 'color', value)
  }), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => updateItem(index, 'imgeurl', ''),
    className: "button button-danger"
  }, stringData.Delete_Image)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.image_side,
    value: item.style,
    options: selectdesign,
    onChange: value => updateItem(index, 'style', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.inner_button,
    value: item.innerbutton,
    onChange: value => updateItem(index, 'innerbutton', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_URLrt,
    value: item.link,
    onChange: value => updateItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Text_on_the_button,
    value: item.button,
    onChange: value => updateItem(index, 'button', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_URLextrenal,
    value: item.linkexternal,
    onChange: value => updateItem(index, 'linkexternal', value)
  }))))), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quiz-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block-with-image light-bg",
    style: {
      background: item.color
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `col-lg-${item.imgeurl ? '7' : '12'}`
  }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (item.upcomingchecbox ? " heading-divider" : "")
  }, item.selectheading && React.createElement(item.selectheading, {
    className: item.sectionTitle
  }, item.sectionTitle)), item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: item.content
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, null), item.innerbutton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-btn text-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link,
    className: "btn btn-primary"
  }, item.innerbutton))), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-lg-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  }))))), item.button && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.linkexternal,
    className: "btn btn-primary"
  }, item.button))))));
}

/***/ }),

/***/ "./src/new-filter-post-archive.js":
/*!****************************************!*\
  !*** ./src/new-filter-post-archive.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl
} = wp.components;
const {
  useSelect
} = wp.data;
const {
  useState,
  useEffect
} = wp.element;
const siteUrl = myBlockData.siteUrl;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/newpost', {
  title: stringData.News,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    },

    postperpage: {
      type: 'number',
      default: ''
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory,
      postperpage
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[get_news_from_custom_post_type post_type=\"", postType, "\" category=\"", selectedCategory, "\" posts_per_page=\"", postperpage, "\"]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory,
    postperpage
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  // useEffect(() => {
  //     // Fetch post type options when the component mounts
  //     getPostTypeOptions().then((options) => {
  //         setPostTypeOptions(options);
  //     });
  // }, []); // Empty dependency array to run the effect only once

  const fetchCategories = async taxonomyslug => {
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
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };
  const getTaxonomySlugForPostType = async postTypeSlug => {
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
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/get-news-from-custom-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-block-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange,
    disabled: !categoryOptions.length
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_per_page,
    value: attributes.postperpage ? attributes.postperpage.toString() : '',
    onChange: newTitle => setAttributes({
      postperpage: newTitle
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }));
}

/***/ }),

/***/ "./src/oder-list-block.js":
/*!********************************!*\
  !*** ./src/oder-list-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/order-list-block', {
  title: stringData.order_list_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: [{
        content: 'Programu Fundusze Europejskie na Infrastrukturę, Klimat i Środowisko'
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      s
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", {
      class: "ordered-list"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, item.content))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    slideritems
  } = props.attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  function addItem() {
    const newItem = {
      content: ''
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Repeater_slidertyui
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.description,
    placeholder: stringData.Enter_a_description,
    value: item.content,
    onChange: value => updateItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.Add_a_item))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", {
    class: "ordered-list"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, item.content))));
}

/***/ }),

/***/ "./src/podstrony-block.js":
/*!********************************!*\
  !*** ./src/podstrony-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  CheckboxControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/podstrony-block', {
  title: stringData.podstrony_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: []
    },
    upcomingchecbox: {
      type: 'boolean',
      default: false
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems,
      upcomingchecbox
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "podstrony-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      class: "col-xl-6 col-md-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "podstrony-card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.sectionurl,
      class: "podstrony-card-inner d-flex align-items-center flex-column" + (upcomingchecbox ? " no-img-hover" : "")
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "card-icon"
    }, " ", item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title)))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    items,
    slideritems,
    upcomingchecbox
  } = attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        imgeurl: urlimage,
        title: 'Punkt dla Przyrody',
        sectionurl: ''
      }]
    });
  }
  function addItem() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      title: 'Punkt dla Przyrody',
      sectionurl: ''
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "podstrony-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Repeattyu_slider
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.sliderdy, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.remove_image_hover,
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.enter_url,
    value: item.sectionurl,
    onChange: value => updateItem(index, 'sectionurl', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.Add_a_item))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    class: "col-xl-6 col-md-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "podstrony-card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.sectionurl,
    class: "podstrony-card-inner d-flex align-items-center flex-column" + (upcomingchecbox ? " no-img-hover" : "")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "card-icon"
  }, " ", item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title)))))));
}

/***/ }),

/***/ "./src/post-List-block.js":
/*!********************************!*\
  !*** ./src/post-List-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  TextControl,
  Button,
  SelectControl,
  PanelBody
} = wp.components;
const {
  useState
} = wp.element;
const siteUrl = myBlockData.siteUrl;
const {
  InspectorControls
} = wp.editor;
const stringData = myBlockData.strings;

registerBlockType('namespace/posts-list-shortcode', {
  title: stringData.custom_shortcode_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postType: {
      type: 'string',
      default: 'post'
    },
    postsPerPage: {
      type: 'number',
      default: 5
    },
    categories: {
      type: 'string',
      default: ''
    }
  },
  edit: CustomShortcodeBlock,
  save: ({
    attributes
  }) => {
    const {
      postType,
      postsPerPage,
      categories
    } = attributes;

    // Return the shortcode as part of the block content
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "shortcode-block"
    }, "[get_posts_from_custom_post_type_second post_type=\"", postType, "\" posts_per_page=\"", postsPerPage, "\" categories=\"", categories, "\"]");
  }
});
function CustomShortcodeBlock(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    postType,
    postsPerPage,
    categories
  } = attributes;
  const [shortcodeOutput, setShortcodeOutput] = useState(''); // Define shortcodeOutput state

  // Function to execute the shortcode
  const executeShortcode = () => {
    // Execute the shortcode and update the shortcodeOutput
    const shortcode = `[get_posts_from_custom_post_type_second post_type="${postType}" posts_per_page="${postsPerPage}"]`;
    setShortcodeOutput(shortcode);
  };
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/posts-from-custom-post-type-second';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "shortcode-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.select_post_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: value => setAttributes({
      postType: value
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.categoriese,
    value: categories,
    onChange: value => setAttributes({
      categories: value
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.posts_per_page,
    type: "number",
    value: postsPerPage,
    onChange: value => setAttributes({
      postsPerPage: parseInt(value)
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null));
}

/***/ }),

/***/ "./src/profect-idea-question-reject.js":
/*!*********************************************!*\
  !*** ./src/profect-idea-question-reject.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls,
  RichText,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextareaControl,
  TextControl,
  SelectControl,
  CheckboxControl
} = wp.components;
const {
  useState
} = wp.element;
const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;
registerBlockType('eprojektynamespace/project-idea-question-reject-block', {
  title: stringData.project_idea_rejection_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [{
        nestedItems: []
      }]
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files,
      postsectiontitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "quiz-container rejectallquestion "
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: `question code${parentIndex}`
    }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: childIndex,
      class: `question quizdisplayreject childindex${1 + childIndex}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "quiz-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-with-image light-bg",
      style: {
        background: nestedItem.color
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `row align-items-center justify-content-between ${nestedItem.style === 'left' ? 'flex-row-reverse' : ''}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `col-lg-${nestedItem.fileUrl ? '7' : '12'}`
    }, nestedItem.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (nestedItem.upcomingchecbox ? " heading-divider" : "")
    }, nestedItem.selectheading && React.createElement(nestedItem.selectheading, {
      className: nestedItem.sectionTitle
    }, nestedItem.sectionTitle)), nestedItem.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: nestedItem.content
      }
    }), nestedItem.innerbutton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-btn text-end"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: nestedItem.link,
      className: "btn btn-primary"
    }, nestedItem.innerbutton))), nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-5"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-img"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: ""
    }))))), nestedItem.button && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: nestedItem.linkexternal,
      className: "btn btn-primary"
    }, nestedItem.button))))))))));
  }
});
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;
  const addFile = parentIndex => {
    // Create a new copy of the files array
    const newFiles = [...files];

    // Push a new nested item with default values
    newFiles[parentIndex].nestedItems.push({
      fileUrl: imgurl,
      // Make sure urlimage is defined
      style: '',
      color: '#eef3ff',
      content: 'Your default content',
      innerbutton: '',
      button: '',
      link: '#',
      linkexternal: '',
      upcomingchecbox: false,
      selectheading: 'h1',
      headings: '',
      sectionTitle: stringData.enter_heading
    });

    // Update the attributes with the new files array
    setAttributes({
      files: newFiles
    });
  };
  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      setAttributes({
        files: newFiles
      });
      console.log(files);
    }
  };
  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  const addSection = () => {
    setAttributes({
      files: [...files, {
        nestedItems: []
      }]
    });
  };
  const removeImage = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems[childIndex].fileUrl = ''; // Remove the image URL
    setAttributes({
      files: newFiles
    });
  };
  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "quiz-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.rejection
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "nested-item mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "section ", childIndex + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    value: nestedItem.selectheading || 'h1',
    options: [{
      value: 'h1',
      label: stringData.Heading + '1'
    }, {
      value: 'h2',
      label: stringData.Heading + '2'
    }, {
      value: 'h3',
      label: stringData.Heading + '3'
    }, {
      value: 'h4',
      label: stringData.Heading + '4'
    }, {
      value: 'h5',
      label: stringData.Heading + '5'
    }, {
      value: 'h6',
      label: stringData.Heading + '6'
    }],
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].selectheading = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiont,
    value: nestedItem.sectionTitle,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].sectionTitle = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: nestedItem.upcomingchecbox,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].upcomingchecbox = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    label: stringData.Enter_a_description,
    placeholder: stringData.Enter_a_description,
    value: nestedItem.content,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].content = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Background_color,
    value: nestedItem.color,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].color = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, parentIndex, childIndex),
    type: "file",
    value: nestedItem.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "list-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: "icon"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2 mt-3"
    }, stringData.select_icon), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger me-2",
      onClick: () => removeImage(parentIndex, childIndex)
    }, stringData.delete_image)))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.inner_button,
    value: nestedItem.innerbutton,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].innerbutton = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_URLrt,
    value: nestedItem.link,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].link = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Text_on_the_button,
    value: nestedItem.button,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].button = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_URLextrenal,
    value: nestedItem.linkexternal,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].linkexternal = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger me-2",
    onClick: () => removeFile(parentIndex, childIndex)
  }, stringData.delete_point))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => addFile(parentIndex),
    className: "button button-primary"
  }, stringData.point)))))), files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: `question code${parentIndex}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, " ", stringData.Question, "  ", 1 + parentIndex, " ", stringData.start), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    class: `question childindex${1 + childIndex}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, " ", stringData.Question, "  ", 1 + childIndex, " ", stringData.start), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quiz-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block-with-image light-bg",
    style: {
      background: nestedItem.color
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `row align-items-center justify-content-between ${nestedItem.style === 'left' ? 'flex-row-reverse' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `col-lg-${nestedItem.fileUrl ? '7' : '12'}`
  }, nestedItem.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (nestedItem.upcomingchecbox ? " heading-divider" : "")
  }, nestedItem.selectheading && React.createElement(nestedItem.selectheading, {
    className: nestedItem.sectionTitle
  }, nestedItem.sectionTitle)), nestedItem.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: nestedItem.content
    }
  }), nestedItem.innerbutton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-btn text-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: nestedItem.link,
    className: "btn btn-primary"
  }, nestedItem.innerbutton))), nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-lg-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: nestedItem.fileUrl,
    alt: ""
  }))))), nestedItem.button && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: nestedItem.linkexternal,
    className: "btn btn-primary"
  }, nestedItem.button))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, " ", stringData.Question, " ", 1 + childIndex, " ", stringData.End, " "))))))));
}

/***/ }),

/***/ "./src/program-schedule-list.js":
/*!**************************************!*\
  !*** ./src/program-schedule-list.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/program-schedule-list', {
  title: stringData.program_schedule_list,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: [{
        startdate: '9:45',
        Enddate: '10:00',
        content: 'Rejestracja uczestników'
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "harmonogram-list-wrap"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      class: "harmonogram-row d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "harmonogram-hours"
    }, item.startdate, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "-"), item.Enddate), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "harmonogram-text"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    slideritems
  } = props.attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  function addItem() {
    const newItem = {
      startdate: '9:45',
      Enddate: '10:00',
      content: 'Rejestracja uczestników'
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      if (media && media.url) {
        updateItem(index, 'imgeurl', media.url);
      }
    });
    mediaLibrary.open();
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Repeater_slidtyr
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.slider, " ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.start_date,
    value: item.startdate,
    onChange: value => updateItem(index, 'startdate', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.end_date,
    value: item.Enddate,
    onChange: value => updateItem(index, 'Enddate', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.description,
    placeholder: stringData.Enter_a_description,
    value: item.content,
    onChange: value => updateItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.Add_a_item))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "harmonogram-list-wrap"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    class: "harmonogram-row d-flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "harmonogram-hours"
  }, item.startdate, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "-"), item.Enddate), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "harmonogram-text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content))))));
}

/***/ }),

/***/ "./src/project-idea-block.js":
/*!***********************************!*\
  !*** ./src/project-idea-block.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls,
  RichText,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextareaControl,
  TextControl,
  SelectControl,
  CheckboxControl
} = wp.components;
const {
  useState
} = wp.element;
const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;
registerBlockType('eprojektynamespace/project-idea-block', {
  title: stringData.project_idea_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [{
        sectiontitle: 'Czy Twój projekt dotyczy co najmniej jednego z wymienionych działań?',
        sectionquestion: '<ul className="unordered-list"><li>Ochrona czynna ex-situ oraz in-situ</li> <li>Opracowanie planów, dokumentów strategicznych i planistycznych</li><li>Zwalczanie inwazyjnych gatunków obcych, zielono-niebieskiej infrastruktury</li><li>Mała retencja zw. z ochroną siedlisk i gatunków</li><li>Opracowanie dokumentów planistycznych dla obszarów chronionych</li><li>Zazielenianie terenów miejskich</li><li>Zarządzanie obszarami chronionymi</li><li>Infrastruktura bezpośrednio służąca edukacji: budowa lub rozbudowa bazy edukacyjnej</li><li>Infrastruktura turystyczna, ukierunkowująca ruch turystyczny w celu zmniejszenia antropopresji na obszary chronione</li></ul>',
        upcomingchecbox: false,
        nestedItems: []
      }]
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files,
      postsectiontitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: parentIndex,
      id: `code${parentIndex + 1}`,
      class: `quiz-container questio ${parentIndex === 0 ? '' : 'quizdisplaynone'}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "question"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "question-content"
    }, file.sectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: file.sectiontitle
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      dangerouslySetInnerHTML: {
        __html: file.sectionquestion
      }
    }), file.upcomingchecbox && parentIndex === files.length - 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "question-option custom-radio-wrap"
    }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: childIndex,
      id: nestedItem.question ? nestedItem.question : nestedItem.ans,
      className: `custom-radio button${childIndex} ${nestedItem.question ? 'questiontype' : 'Anstype'} ${nestedItem.hint ? 'tooltip-active' : ''}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "radio",
      name: "question-1",
      value: `childindex${childIndex}`,
      checked: childIndex === 0 // Check the first radio button
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, nestedItem.title), nestedItem.hint && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "cwb-tooltip"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      class: "btn btn-secondary",
      "data-bs-container": "body",
      "data-bs-toggle": "popover",
      "data-bs-placement": "bottom",
      "data-bs-trigger": "hover focus",
      "data-bs-content": `${nestedItem.hint}`
    }, "?"))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: `question-btn d-flex justify-content-end ${parentIndex === files.length - 1 ? 'buttondisplaynone' : ''}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: `web-btn ${parentIndex === 0 ? 'quizbuttonremove' : ''}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "#",
      id: "prev-btn",
      className: "btn btn-transparent prev-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "8",
      height: "14",
      viewBox: "0 0 8 14",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M6.61702 12.6167L1 6.99968L6.61702 1.38266",
      stroke: "#003399",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Poprzednie pytanie"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "#",
      id: "next-btn",
      class: "btn btn-primary  next-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Nast\u0119pne pytanie"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "8",
      height: "14",
      viewBox: "0 0 8 14",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
      stroke: "white",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }))))))));
  }
});
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;
  const addFile = parentIndex => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: 'New Title',
      hint: '',
      ans: '',
      question: ''
    });
    setAttributes({
      files: newFiles
    });
  };
  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  const addSection = () => {
    setAttributes({
      files: [...files, {
        sectiontitle: 'Czy Twój projekt dotyczy co najmniej jednego z wymienionych działań?',
        sectionquestion: '<ul className="unordered-list"><li>Ochrona czynna ex-situ oraz in-situ</li> <li>Opracowanie planów, dokumentów strategicznych i planistycznych</li><li>Zwalczanie inwazyjnych gatunków obcych, zielono-niebieskiej infrastruktury</li><li>Mała retencja zw. z ochroną siedlisk i gatunków</li><li>Opracowanie dokumentów planistycznych dla obszarów chronionych</li><li>Zazielenianie terenów miejskich</li><li>Zarządzanie obszarami chronionymi</li><li>Infrastruktura bezpośrednio służąca edukacji: budowa lub rozbudowa bazy edukacyjnej</li><li>Infrastruktura turystyczna, ukierunkowująca ruch turystyczny w celu zmniejszenia antropopresji na obszary chronione</li></ul>',
        upcomingchecbox: false,
        nestedItems: []
      }]
    });
  };
  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "quiz-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Question_block
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "text",
    label: stringData.description_project,
    placeholder: stringData.Enter_a_description_project,
    value: file.sectiontitle,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].sectiontitle = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    type: "text",
    label: stringData.question_description,
    value: file.sectionquestion,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].sectionquestion = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, parentIndex === files.length - 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: file.upcomingchecbox,
    onChange: newChecked => {
      const newFiles = [...files];
      newFiles[parentIndex].upcomingchecbox = newChecked;
      setAttributes({
        files: newFiles
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop aad-a-e-e-bdbbc-1v57ksj"
  }, stringData.button), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "nested-item mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "text",
    placeholder: stringData.Enter_a_label,
    label: stringData.inputlabel,
    value: nestedItem.title,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].title = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    type: "text",
    label: stringData.hint,
    value: nestedItem.hint,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].hint = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "number",
    placeholder: stringData.go_to_ansnumber,
    label: stringData.ansnumber,
    value: nestedItem.ans,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].ans = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "number",
    placeholder: stringData.go_to_question,
    label: stringData.questionnumber,
    value: nestedItem.question,
    onChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].question = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger me-2",
    onClick: () => removeFile(parentIndex, childIndex)
  }, stringData.delete_point))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => addFile(parentIndex),
    className: "button button-primary"
  }, stringData.point)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeSection(parentIndex)
  }, stringData.usun_sekcje)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addSection,
    className: "button button-primary"
  }, stringData.add_sectit)))), files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "border"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, " question ", parentIndex + 1)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "question"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "question-content"
  }, file.sectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: file.sectiontitle
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: file.sectionquestion
    }
  }), file.upcomingchecbox && parentIndex === files.length - 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "question-option custom-radio-wrap"
  }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    "data-typenumber": nestedItem.question ? nestedItem.question : nestedItem.ans,
    id: nestedItem.question ? nestedItem.question : nestedItem.ans,
    "data-type": `${nestedItem.question ? 'questiontype' : 'Anstype'}`,
    className: `custom-radio button${childIndex} ${nestedItem.question ? 'questiontype' : 'Anstype'} ${nestedItem.hint ? 'tooltip-active' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "radio",
    name: "question-1",
    value: `childindex${childIndex}`
    // checked={childIndex === 0} // Check the first radio button
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, nestedItem.title), nestedItem.hint && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "cwb-tooltip"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-container": "body",
    "data-bs-toggle": "popover",
    "data-bs-placement": "bottom",
    "data-bs-trigger": "hover focus",
    "data-bs-content": `${nestedItem.hint}`
  }, "?"))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: `question-btn d-flex justify-content-end ${parentIndex === files.length - 1 ? 'buttondisplaynone' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: `web-btn ${parentIndex === 0 ? 'quizbuttonremove' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    id: "prev-btn",
    className: "btn btn-transparent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M6.61702 12.6167L1 6.99968L6.61702 1.38266",
    stroke: "#003399",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Poprzednie pytanie"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    id: "next-btn",
    class: "btn btn-primary "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Nast\u0119pne pytanie"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
    stroke: "white",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })))))))));
}

/***/ }),

/***/ "./src/second-mapshortcode-block.js":
/*!******************************************!*\
  !*** ./src/second-mapshortcode-block.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl,
  CheckboxControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.screentshotmap;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;

registerBlockType('cwbnamespace/second-map-shortcode', {
  title: stringData.map_blockt,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    selectedCategory: {
      type: 'string',
      default: '' // Default post type
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    },

    items: {
      type: 'array',
      default: []
    },
    upcomingchecbox: {
      type: 'boolean',
      default: false
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory,
      items,
      upcomingchecbox
    } = attributes;
    const mapicon = items.map(item => `${item.title}|${item.imgeurl}`).join('^');
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "[second_stylethree categoriesslug=", selectedCategory, " mapicon=\"", mapicon, "\" upcomingcheckbox = \"", attributes.upcomingchecbox.toString(), "\"]");
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    items,
    selectedCategory,
    upcomingchecbox
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    onPostTypeChange('mapa');
  }, []);

  // Function to fetch categories based on taxonomy slug
  const fetchCategories = async taxonomyslug => {
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
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onchangefunction = checkvalue => {
    setAttributes({
      upcomingchecbox: checkvalue
    }); // Updating upcomingchecbox attribute
  };

  // Function to get post type options
  const onPostTypeChange = async newPostType => {
    // setAttributes({ postType: newPostType, selectedCategory: '' });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };

  // Function to get the taxonomy slug for a given post type
  const getTaxonomySlugForPostType = async postTypeSlug => {
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
    props.setAttributes({
      items: updatedItems
    });
  }
  function addItem() {
    const newItem = {
      title: 'Communication strategy',
      imgeurl: ''
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        title: 'Communication strategy',
        imgeurl: ''
      }]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      console.log(media);
      if (media && media.url) {
        updateItem(index, 'imgeurl', media.url);
        updateItem(index, 'imgealt', media.alt);
      }
      if (media && media.caption) {
        updateItem(index, 'captiondata', media.caption);
      }
    });
    mediaLibrary.open();
  }
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/second_stylethree-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: 'Ukryj legendę',
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  })), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.repeter, " ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateItem(index, 'title', value)
  }), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.add_item))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, attributes.selectedCategory), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: kelendarz,
    alt: "icong"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }));
}

/***/ }),

/***/ "./src/slider-coustom-post.js":
/*!************************************!*\
  !*** ./src/slider-coustom-post.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const siteUrl = myBlockData.siteUrl;
const {
  useSelect
} = wp.data;
const {
  useState,
  useEffect
} = wp.element;

registerBlockType('giosnamespace/slider-repeater-block', {
  title: stringData.Select_a_post_type,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postperpage: {
      type: 'number',
      // Set the type to 'number'
      default: 4 // Default value for the number of posts per page
    },

    postType: {
      type: 'string',
      default: ''
    },
    categoriesslu: {
      type: 'string',
      default: ''
    },
    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    postsData: {
      type: 'array',
      // Store fetched posts data
      default: []
    },
    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    },

    firststyle: {
      type: 'string',
      // The type can be 'string', 'number', or other appropriate types
      default: 'style1' // The default value when the block is first added
    },

    selectdesign: {
      type: 'array',
      default: [{
        value: '',
        // Unique value for style1
        label: stringData.selected_style
      }, {
        value: 'style1',
        // Unique value for style1
        label: stringData.style + '1' // Concatenate the style variable and '1'
      }, {
        value: 'style2',
        // Unique value for style2
        label: stringData.style + '2'
      }, {
        value: 'style3',
        // Unique value for style3
        label: stringData.style + '3'
      }]
    },
    postsectiontitle: {
      type: 'string',
      default: 'Nabory'
    },
    postsearchtitletitle: {
      type: 'string',
      default: ''
    },
    searchButtonURL: {
      type: 'string',
      default: '#'
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    // console.log(attributes);
    const {
      postsData,
      postType,
      firststyle,
      postperpage,
      postsectiontitle,
      selectedCategory
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, firststyle === 'style1' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      className: "block-row nabory-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "carousel-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "owl-carousel owl-theme nabory-carousel"
    }, "[display_publications_list post_type=\"", postType, "\" posts_per_page=\"", postperpage, "\" category =\"", selectedCategory, "\"]")), attributes.postsearchtitletitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-btn view-all-btn text-end"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: attributes.searchButtonURL,
      className: "btn btn-transparent"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "15",
      height: "15",
      viewBox: "0 0 15 15",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
      cx: "6.41667",
      cy: "6.41667",
      r: "5.41667",
      stroke: "#003399",
      "stroke-width": "2"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M14 14L10.5 10.5",
      stroke: "#003399",
      "stroke-width": "2",
      "stroke-linecap": "round"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, attributes.postsearchtitletitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "8",
      height: "14",
      viewBox: "0 0 8 15",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
      stroke: "#003399",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })))))), firststyle === 'style2' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: "block-row szkolenia-sec light-bg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "carousel-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "owl-carousel owl-theme szkolenia-carousel"
    }, "[display_publications_styletwo post_type=\"", postType, "\" posts_per_page=\"", postperpage, "\" category =\"", selectedCategory, "\"]")), attributes.postsearchtitletitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn view-all-btn text-end"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: attributes.searchButtonURL,
      class: "btn btn-transparent"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "15",
      height: "15",
      viewBox: "0 0 15 15",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
      cx: "6.41667",
      cy: "6.41667",
      r: "5.41667",
      stroke: "#003399",
      "stroke-width": "2"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M14 14L10.5 10.5",
      stroke: "#003399",
      "stroke-width": "2",
      "stroke-linecap": "round"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, attributes.postsearchtitletitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "8",
      height: "14",
      viewBox: "0 0 8 15",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
      stroke: "#003399",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })))))), firststyle === 'style3' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: "block-row aktualnosci-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "carousel-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "owl-carousel owl-theme aktualnosci-carousel"
    }, "[display_publications_stylethree post_type=\"", postType, "\" posts_per_page=\"", postperpage, "\" category =\"", selectedCategory, "\"]")), attributes.postsearchtitletitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn view-all-btn text-end"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: attributes.searchButtonURL,
      class: "btn btn-transparent"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "15",
      height: "15",
      viewBox: "0 0 15 15",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
      cx: "6.41667",
      cy: "6.41667",
      r: "5.41667",
      stroke: "#003399",
      "stroke-width": "2"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M14 14L10.5 10.5",
      stroke: "#003399",
      "stroke-width": "2",
      "stroke-linecap": "round"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, attributes.postsearchtitletitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "8",
      height: "14",
      viewBox: "0 0 8 15",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
      stroke: "#003399",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory,
    postsData,
    selectdesign,
    firststyle,
    postsectiontitle,
    postsearchtitletitle,
    searchButtonURL,
    categoriesslu
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState(attributes.categoryOptions || []);

  // Function to get post type options
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: 'Post',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };

  // Function to fetch categories based on the selected post type
  const fetchCategories = async taxonomyslug => {
    try {
      let response; // Declare the response variable once here

      if (taxonomyslug === 'category') {
        response = await fetch(siteUrl + `/wp-json/wp/v2/categories`);
      } else {
        response = await fetch(siteUrl + `/wp-json/wp/v2/${taxonomyslug}`);
      }
      if (!response.ok) {
        if (response.status === 404) {
          // Handle the case where the taxonomy does not exist
          setCategoryOptions([]);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();

        // Map fetched categories to newCategoryOptions
        const newCategoryOptions = data.map(categoryr => ({
          value: categoryr.id,
          label: categoryr.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          // Add an empty value for the default option
          label: stringData.Select_Category // Customize the label for the default option
        }, ...newCategoryOptions // Include the fetched categories after the default option
        ];
        // Update the categoryOptions attribute with fetched categories
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const getTaxonomySlugForPostType = async postTypeSlug => {
    try {
      // Make a request to fetch the post type details

      const response = await fetch(siteUrl + `/wp-json/wp/v2/types/${postTypeSlug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Check if 'taxonomies' property exists in the response data
      if (data && data.taxonomies) {
        // Assuming that a post type can have multiple taxonomies, you may need to choose one
        // or implement logic to handle multiple taxonomies
        const taxonomySlug = data.taxonomies[0]; // Assuming we take the first taxonomy
        return taxonomySlug;
      }
      return ''; // Return an empty string if taxonomies are not found
    } catch (error) {
      console.error('Error fetching taxonomy for post type:', error);
      return ''; // Return an empty string in case of an error
    }
  };

  // Function to update the selected category
  const onCategoryChange = async newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });

    // Fetch posts based on the selected category
    fetchPosts(newCategory, attributes.postType, attributes.categoriesslu, attributes.postperpage);
  };
  const handleChange = newPerPage => {
    // Parse the newPerPage value to an integer or set it to 0 if it's not a valid number
    const parsedPerPage = parseInt(newPerPage) || 0;
    setAttributes({
      postperpage: parsedPerPage
    });
    fetchPosts(selectedCategory, postType, attributes.categoriesslu, parsedPerPage); // Pass parsedPerPage here
  };

  // ...

  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: '',
      postsData: []
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchPosts(attributes.selectedCategory, newPostType, taxonomyslug, attributes.postperpage); // Pass attributes.postperpage here

    fetchCategories(taxonomyslug); // Fetch categories for the new post type
    setAttributes({
      categoriesslu: taxonomyslug
    });
  };

  // ...

  const fetchPosts = async (category, postType, categoriesslug, perPage = 4) => {
    try {
      let response;
      let apiEndpoint;
      if (category) {
        if (categoriesslug === 'category') {
          apiEndpoint = postType === 'post' ? siteUrl + `/wp-json/wp/v2/posts?_embed&categories=${category}&per_page=${perPage}` : siteUrl + `/wp-json/wp/v2/${postType}?_embed&categories=${category}&per_page=${perPage}`;
        } else {
          apiEndpoint = postType === 'post' ? siteUrl + `/wp-json/wp/v2/posts?_embed&${categoriesslug}=${category}&per_page=${perPage}` : siteUrl + `/wp-json/wp/v2/${postType}?_embed&${categoriesslug}=${category}&per_page=${perPage}`;
        }
      } else {
        apiEndpoint = postType === 'post' ? siteUrl + `/wp-json/wp/v2/posts?_embed&per_page=${perPage}` : siteUrl + `/wp-json/wp/v2/${postType}?_embed&per_page=${perPage}`;
      }

      //     if (perPage === 0) {
      //         apiEndpoint = postType === 'post'
      //             ? siteUrl + `/wp-json/wp/v2/posts?_embed&categories=${category}`
      //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed&categories=${category}`;
      //     } else {
      //         apiEndpoint = postType === 'post'
      //             ? siteUrl + `/wp-json/wp/v2/posts?_embed&categories=${category}&per_page=${perPage}`
      //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed&categories=${category}&per_page=${perPage}`;
      //     }
      // } else {
      //     if (perPage === 0) {
      //         apiEndpoint = postType === 'post'
      //             ? siteUrl + `/wp-json/wp/v2/posts?_embed`
      //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed`;
      //     } else {
      //         apiEndpoint = postType === 'post'
      //             ? siteUrl + `/wp-json/wp/v2/posts?_embed&per_page=${perPage}`
      //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed&per_page=${perPage}`;
      //     }
      // }

      response = await fetch(apiEndpoint);
      if (!response.ok) {
        if (response.status === 404) {
          // Handle the case where the taxonomy does not exist
          setAttributes({
            postsData: []
          }); // Set postsData to an empty array
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        setAttributes({
          postsData: data
        });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    console.log(postsData);
  };
  function stripHtmlTags(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }
  function getdateandtime(datetime) {
    const dateString = datetime;

    // Create a JavaScript Date object from the date string
    const dateObj = new Date(dateString);

    // Extract the month (0-based index)
    const month = dateObj.getMonth() + 1; // Adding 1 to get the correct month (1-12)

    // Extract the date (day of the month)
    const date = dateObj.getDate();
    var weekday = dateObj.toLocaleString("default", {
      weekday: "short"
    });
    console.log(weekday);

    // Extract the time in HH:MM:SS format
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    // Format the date, month, and time as needed
    const formattedDate = `${date}/${month} ${weekday} <span>|</span> ${hours}:${minutes}`;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      dangerouslySetInnerHTML: {
        __html: formattedDate
      }
    });
  }
  function secondtime(datetime) {
    const dateString = datetime;

    // Create a JavaScript Date object from the date string
    const dateObj = new Date(dateString);

    // Extract the month (0-based index)
    const month = dateObj.getMonth() + 1; // Adding 1 to get the correct month (1-12)

    // Extract the date (day of the month)
    const date = dateObj.getDate();

    // Extract the time in HH:MM:SS format

    // Format the date, month, and time as needed
    const formattedDate = `${date}.${month}.${dateObj.getFullYear()}`;
    return formattedDate;
  }
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/publications_list-custom-post-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Repeater_Settings
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Section_title,
    value: attributes.postsectiontitle,
    onChange: newTitle => setAttributes({
      postsectiontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_per_page,
    value: attributes.postperpage ? attributes.postperpage.toString() : '',
    onChange: handleChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_post_style,
    value: firststyle,
    options: selectdesign,
    onChange: newStyle => setAttributes({
      firststyle: newStyle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange,
    disabled: !categoryOptions.length
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.wyszukiwarki_titlet,
    value: attributes.postsearchtitletitle,
    onChange: newTitle => setAttributes({
      postsearchtitletitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_URL,
    value: attributes.searchButtonURL,
    onChange: newURL => setAttributes({
      searchButtonURL: newURL
    })
  }))), firststyle === 'style1' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "block-row nabory-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "carousel-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: " owl-theme nabory-carousel"
  }, postsData.map(post => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "item",
    key: post.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-card card-style-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-featured-img"
  }, post._embedded['wp:featuredmedia']?.[0]?.source_url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: post._embedded['wp:featuredmedia'][0].source_url,
    alt: post.title.rendered,
    title: post.title.rendered
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, post.title.rendered), post._embedded['author']?.[0]?.name && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "author"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, post._embedded['author']?.[0]?.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "status-recruitment d-flex align-items-center"
  }, post._embedded['wp:term']?.[0]?.[0]?.name && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "status-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, post._embedded['wp:term'][0][0].name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: stripHtmlTags(post.excerpt.rendered)
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn text-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: post.link,
    class: "btn btn-primary"
  }, "szczeg\xF3\u0142y")))))))), attributes.postsearchtitletitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-btn view-all-btn text-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: attributes.searchButtonURL,
    className: "btn btn-transparent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "6.41667",
    cy: "6.41667",
    r: "5.41667",
    stroke: "#003399",
    "stroke-width": "2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M14 14L10.5 10.5",
    stroke: "#003399",
    "stroke-width": "2",
    "stroke-linecap": "round"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, attributes.postsearchtitletitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "8",
    height: "14",
    viewBox: "0 0 8 15",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
    stroke: "#003399",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })))))), firststyle === 'style2' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: "block-row szkolenia-sec light-bg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "carousel-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: " owl-theme szkolenia-carousel"
  }, postsData.map(post => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-card card-style-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-featured-img"
  }, post._embedded['wp:featuredmedia']?.[0]?.source_url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: post._embedded['wp:featuredmedia'][0].source_url,
    alt: post.title.rendered,
    title: post.title.rendered
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-content uu"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, post.title.rendered), post.excerpt.rendered, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-meta d-flex align-items-center justify-content-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "date-location d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "date-sec"
  }, getdateandtime(post.date)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "location-sec d-flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "23",
    viewBox: "0 0 18 23",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group 42612"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "Ellipse 208",
    d: "M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z",
    fill: "#43516F"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    id: "Ellipse 209",
    cx: "9",
    cy: "9",
    r: "4",
    fill: "#EEF3FF"
  }))), post.meta.custom_text_field)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn text-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: post.link,
    class: "btn btn-primary"
  }, "szczeg\xF3\u0142y"))))))))), attributes.postsearchtitletitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn view-all-btn text-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: attributes.searchButtonURL,
    class: "btn btn-transparent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "6.41667",
    cy: "6.41667",
    r: "5.41667",
    stroke: "#003399",
    "stroke-width": "2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M14 14L10.5 10.5",
    stroke: "#003399",
    "stroke-width": "2",
    "stroke-linecap": "round"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, attributes.postsearchtitletitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "8",
    height: "14",
    viewBox: "0 0 8 15",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
    stroke: "#003399",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })))))), firststyle === 'style3' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: "block-row aktualnosci-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "carousel-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: " owl-theme aktualnosci-carousel"
  }, postsData.map(post => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-card card-style-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-featured-img"
  }, post._embedded['wp:featuredmedia']?.[0]?.source_url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: post._embedded['wp:featuredmedia'][0].source_url,
    alt: post.title.rendered,
    title: post.title.rendered
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "article-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "date-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, secondtime(post.date))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, post.title.rendered), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: post.title.rendered,
    class: "btn btn-primary"
  }, "czytaj")))))))), attributes.postsearchtitletitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn view-all-btn text-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: attributes.searchButtonURL,
    class: "btn btn-transparent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "6.41667",
    cy: "6.41667",
    r: "5.41667",
    stroke: "#003399",
    "stroke-width": "2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M14 14L10.5 10.5",
    stroke: "#003399",
    "stroke-width": "2",
    "stroke-linecap": "round"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, attributes.postsearchtitletitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "8",
    height: "14",
    viewBox: "0 0 8 15",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169",
    stroke: "#003399",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })))))));
}

/***/ }),

/***/ "./src/slider-gallery.js":
/*!*******************************!*\
  !*** ./src/slider-gallery.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/slider-gallery-block', {
  title: stringData.sliderallerty,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        captiondata: ''
      }]
    },
    postsectiontitle: {
      type: 'string',
      default: stringData.sectiont
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      postsectiontitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "gallery-slider-block"
    }, postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "owl-carousel owl-theme gallery-carousel"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.imgeurl,
      "data-fancybox": "gallery-carousel",
      "data-caption": item.captiondata
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    }))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    postsectiontitle
  } = props.attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  function addItem() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      captiondata: ''
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      console.log(media);
      if (media && media.url) {
        updateItem(index, 'imgeurl', media.url);
        updateItem(index, 'imgealt', media.alt);
      }
      if (media && media.caption) {
        updateItem(index, 'captiondata', media.caption);
      }
    });
    mediaLibrary.open();
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "gallery-slider-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.slider_gallery_Settings
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    value: postsectiontitle,
    onChange: newTitle => props.setAttributes({
      postsectiontitle: newTitle
    })
  }), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, " ", stringData.image, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.add_itemfanc))), postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: " owl-theme gallery-carousel"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.imgeurl,
    "data-fancybox": "gallery-carousel",
    "data-caption": item.captiondata
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  }))))));
}

/***/ }),

/***/ "./src/slider.js":
/*!***********************!*\
  !*** ./src/slider.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/image-repeater-block', {
  title: stringData.Home_page_banner_slider,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'Punkt dla Przyrody',
        button: 'Czytaj więcej',
        link: '#',
        date: '19.06.2023'
      }]
    },
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'Znajdź dofinsowanie',
        button: 'DOFINANSOWANIE',
        link: '#'
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: "home-main light-bg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-xl-8 col-lg-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "slider-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "slider-block",
      class: "carousel slide",
      "data-bs-ride": "carousel"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "carousel-inner"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `carousel-item ${index === 0 ? 'active' : ''}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "slider-block-card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "slider-img"
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "slider-block-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn d-flex align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      class: "btn btn-primary"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "visually-hidden"
    }, item.title), " ", item.button), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item.date))))))), items[1] && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "prev-next-buttons d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      id: "btnPause",
      class: "carousel-control-pause",
      type: "button"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      class: "pause-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "32",
      height: "28",
      viewBox: "0 0 32 28",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M14 10V21M19 10V21",
      stroke: "#003399",
      "stroke-width": "1.8",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "visually-hidden"
    }, stringData.slider_pause)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      id: "btnPlay",
      class: "carousel-control-play",
      type: "button",
      style: "display: none;"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "10",
      height: "14",
      viewBox: "0 0 10 14",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M0.552786 13.8944C0.214002 13.725 -2.7155e-08 13.3788 -4.37116e-08 13L-5.68248e-07 0.999994C-5.84805e-07 0.621222 0.214002 0.27496 0.552786 0.105567C0.89157 -0.0638247 1.29698 -0.0272694 1.6 0.199994L9.6 6.19999C9.85181 6.38885 10 6.68524 10 6.99999C10 7.31475 9.85181 7.61114 9.6 7.79999L1.6 13.8C1.29698 14.0273 0.89157 14.0638 0.552786 13.8944ZM2 11L7.33333 6.99999L2 2.99999L2 11Z",
      fill: "#003399"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "visually-hidden"
    }, stringData.slider_play)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      class: "custom-control-prev",
      type: "button",
      "data-bs-target": "#slider-block",
      "data-bs-slide": "prev"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "32",
      height: "31",
      viewBox: "0 0 32 31",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z",
      fill: "#003399"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "visually-hidden"
    }, stringData.slider_Previous)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      class: "custom-control-next",
      type: "button",
      "data-bs-target": "#slider-block",
      "data-bs-slide": "next"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "32",
      height: "31",
      viewBox: "0 0 32 31",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z",
      fill: "#003399"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "visually-hidden"
    }, stringData.slider_Next)))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-xl-4 col-lg-6"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: "block-link-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      className: "d-flex align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "icon-sec ",
      "aria-hidden": "true"
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt,
      alt: "icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item.button), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title))))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    slideritems
  } = props.attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    props.setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  function addItem() {
    const newItem = {
      imgeurl: '',
      imgealt: '',
      title: '',
      button: 'Text',
      link: '#',
      date: ''
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  function addItemSec() {
    const newItem = {
      imgeurl: '',
      imgealt: '',
      title: '',
      button: 'Text',
      link: '#',
      date: ''
    };
    props.setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    props.setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "home-main light-bg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-xl-8 col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Repeater_slider
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.slider, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Text_on_the_button,
    value: item.button,
    onChange: value => updateItem(index, 'button', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_URL,
    value: item.link,
    onChange: value => updateItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Enter_date,
    value: item.date,
    onChange: value => updateItem(index, 'date', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.Add_a_item))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "slider-block",
    className: "carousel slide",
    "data-bs-ride": "carousel"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "carousel-inner"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: `carousel-item ${index === 0 ? 'active' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider-block-card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider-img"
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider-block-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-btn d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link,
    className: "btn btn-primary"
  }, item.button), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item.date)))))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-xl-4 col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.sider_block
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.side_block, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    value: item.button,
    onChange: value => updateSliderItem(index, 'button', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Section_heading,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.enter_url,
    value: item.link,
    onChange: value => updateSliderItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.Add_a_item))), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "block-link-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link,
    className: "d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon-sec"
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item.button), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title)))))))));
}

/***/ }),

/***/ "./src/text-titlerepeter-block.js":
/*!****************************************!*\
  !*** ./src/text-titlerepeter-block.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/text-title', {
  title: stringData.text_title,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: []
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "information-list"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "d-flex info-list-row",
      style: {
        borderColor: item.color
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "info-list-left"
    }, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "info-list-right"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", {
      dangerouslySetInnerHTML: {
        __html: item.content
      }
    })))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    slideritems
  } = props.attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  function addItem() {
    const newItem = {
      title: 'Temat szkolenia',
      content: 'Ut sollicitudin ipsum est, ',
      color: '#EEF3FF'
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        color: '#EEF3FF',
        title: 'Temat szkolenia',
        content: 'Ut sollicitudin ipsum est, non maximus sem dignissim at.'
      }]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "information-list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Training_File_Block
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.repeter, " ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.description,
    placeholder: stringData.Enter_a_description,
    value: item.content,
    onChange: value => updateItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.border_color,
    value: item.color,
    onChange: value => updateItem(index, 'color', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.Add_itemyu))), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "d-flex info-list-row",
    style: {
      borderColor: item.color
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "info-list-left"
  }, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "info-list-right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", {
    dangerouslySetInnerHTML: {
      __html: item.content
    }
  })))));
}

/***/ }),

/***/ "./src/toggle-file-list-block.js":
/*!***************************************!*\
  !*** ./src/toggle-file-list-block.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;

registerBlockType('makeupnamespace/file-block', {
  title: stringData.Accordion,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: []
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion",
      id: "accordion-block"
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-item",
      key: parentIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "accordion-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `accordion-button collapsed ${parentIndex === 0 ? '' : 'collapsed'}`,
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#collapse-${file.uniqueid}`,
      "aria-expanded": "true",
      "aria-controls": `collapse-${file.uniqueid}`
    }, file.sectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: `collapse-${file.uniqueid}`,
      className: `accordion-collapse collapse `,
      "data-bs-parent": "#accordion-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null), file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: file.sectioncontent
      }
    }), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-link-sec",
      key: childIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: nestedItem.fileUrl,
      className: "d-flex align-items-center",
      download: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "icon-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "22",
      viewBox: "0 0 20 22",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20",
      stroke: "#003399",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, nestedItem.title, " [", nestedItem.fileName, ", ", nestedItem.fileSize, "]")))))))))));
  }
});
const {
  useState
} = wp.element;
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useInstanceId)(CustomBlockEdit);
  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].fileSize = media.filesizeHumanReadable;
      newFiles[parentIndex].nestedItems[childIndex].fileName = media.subtype;
      newFiles[parentIndex].nestedItems[childIndex].filetitle = media.filename;
      setAttributes({
        files: newFiles
      });
    }
    ;
  };
  const addFile = parentIndex => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: '',
      fileUrl: '',
      fileName: '',
      filetitle: '',
      fileSize: 0
    });
    setAttributes({
      files: newFiles
    });
  };
  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  const addSection = () => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    setAttributes({
      files: [...files, {
        sectiontitle: 'Partnerstwa publiczno – prywatne',
        sectioncontent: 'Ponadto udział poszczególnych partnerów w ramach projektu partnerskiego nie mogą polegać na oferowaniu towarów, świadczeniu usług lub wykonywaniu robót budowlanych na rzecz pozostałych partnerów – celem tego przepisu jest zabezpieczenie przed omijaniem zasad PZP. W tym rozwiązaniu chodzi o to, że każdy z partnerów musi realizować określone zadania przewidziane z porozumienia/umowy – innymi słowy wymagany jest aktywny i merytoryczny udział partnera w realizacji projektu, ponieważ celem projektu partnerskiego jest zaangażowanie dodatkowych podmiotów w realizację projektu celem osiągnięcia lepszych rezultatów niż byłoby to możliwe, gdyby projekt był realizowany jedynie np. przez partnera wiodącego.',
        nestedItems: [],
        // An array for nested items
        uniqueid: newUniqueId
      }]
    });
  };
  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Accordion_File_Block
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.Title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: stringData.Enter_a_title,
    className: "form-control",
    value: file.sectiontitle,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].sectiontitle = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    placeholder: stringData.Enter_a_description,
    value: file.sectioncontent,
    className: "form-control",
    rows: 10 // Set the number of rows to 20
    ,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].sectioncontent = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.File_title), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "nested-item mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: stringData.Enter_a_title,
    className: "form-control",
    value: nestedItem.title,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].title = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, parentIndex, childIndex),
    type: "file",
    value: nestedItem.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "margin-top"
    }, " "), nestedItem.filetitle && stringData.filename, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "margin-top"
    }, " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
      className: "margin-top"
    }, nestedItem.filetitle, " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2"
    }, nestedItem.fileUrl ? stringData.Change_file : stringData.choose_a_file), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger",
      onClick: () => removeFile(parentIndex, childIndex)
    }, stringData.remove)))
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => addFile(parentIndex),
    className: "button button-primary"
  }, stringData.add_file)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeSection(parentIndex)
  }, stringData.Delete_a_section)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addSection,
    className: "button button-primary"
  }, stringData.add_sectiont)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion",
    id: "accordion-block"
  }, files.map((file, parentIndex) => {
    // Generate a unique clientId for each repeated parent block
    const clientId = `inner-block-${parentIndex}`;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-item",
      key: parentIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "accordion-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `accordion-button collapsed ${parentIndex === 0 ? '' : 'collapsed'}`,
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#collapse-${file.uniqueid}`,
      "aria-expanded": "true",
      "aria-controls": `collapse-${file.uniqueid}`
    }, file.sectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: `collapse-${file.uniqueid}`,
      className: `accordion-collapse collapse `,
      "data-bs-parent": "#accordion-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-body"
    }, file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: file.sectioncontent
      }
    }), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-link-sec",
      key: childIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: nestedItem.fileUrl,
      className: "d-flex align-items-center",
      download: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "icon-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "22",
      viewBox: "0 0 20 22",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20",
      stroke: "#003399",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, nestedItem.title, " [", nestedItem.fileName, ", ", nestedItem.fileSize, "]"))))))));
  })));
}

/***/ }),

/***/ "./src/toggle-inner-section.js":
/*!*************************************!*\
  !*** ./src/toggle-inner-section.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;


// function generateUniqueId() {
//   return 'unique-id-' + Math.floor(Math.random() * 10000); // You can use a more robust method for generating unique IDs if needed
// }

registerBlockType('makeupnamespace/section-block', {
  title: stringData.Accordion_inner_section,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: []
    },
    uniqueidto: {
      type: 'string',
      default: 'rrrtttr' // Assuming you want a blank string as default; adjust as needed
    }
  },

  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files,
      uniqueidto
    } = attributes;
    // const uniqueId = Date.now();

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion",
      id: uniqueidto
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-item",
      key: parentIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "accordion-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `accordion-button collapsed ${parentIndex === 0 ? '' : 'collapsed'}`,
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#collapse-${file.uniqueid}`,
      "aria-expanded": "true",
      "aria-controls": `collapse-${file.uniqueid}`
    }, file.sectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: `collapse-${file.uniqueid}`,
      className: `accordion-collapse collapse `,
      "data-bs-parent": `#${uniqueidto}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "podstrony-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-xl-6 col-md-6",
      key: childIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "podstrony-card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: nestedItem.url,
      class: "podstrony-card-inner d-flex align-items-center flex-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "card-icon"
    }, " ", nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: "icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, nestedItem.title))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null), file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: file.sectioncontent
      }
    })))))));
  }
});
const {
  useState
} = wp.element;
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files,
    uniqueidto
  } = attributes;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useInstanceId)(CustomBlockEdit);
  // const uniqueId = Date.now();

  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].fileSize = media.filesizeHumanReadable;
      newFiles[parentIndex].nestedItems[childIndex].fileName = media.subtype;
      setAttributes({
        files: newFiles
      });
    }
    ;
  };
  const addFile = parentIndex => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: '',
      fileUrl: '',
      fileName: '',
      fileSize: 0
    });
    setAttributes({
      files: newFiles
    });
  };
  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  function generateCurrentTimeWithSeconds() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }
  const addSection = () => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    const newUniqueIdto = `unique-idto-${instanceId}-${Date.now()}`;
    setAttributes({
      files: [...files, {
        sectiontitle: 'Partnerstwa publiczno – prywatne',
        sectioncontent: '... long text ...',
        nestedItems: [{
          fileUrl: urlimage,
          title: 'Program SZOP',
          url: '#'
        }],
        uniqueid: newUniqueId
      }],
      uniqueidto: newUniqueIdto // Corrected attribute name and combined update
    });
  };

  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Accordion_File_Block
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.Title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: stringData.Enter_a_title,
    className: "form-control",
    value: file.sectiontitle,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].sectiontitle = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    placeholder: stringData.Enter_a_description,
    value: file.sectioncontent,
    className: "form-control",
    rows: 10 // Set the number of rows to 20
    ,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].sectioncontent = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.File_title), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "nested-item mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: stringData.Enter_a_title,
    className: "form-control",
    value: nestedItem.title,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].title = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.enter_url), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "form-control",
    value: nestedItem.url,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].url = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, parentIndex, childIndex),
    type: "file",
    value: nestedItem.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2"
    }, nestedItem.fileUrl ? stringData.Change_file : stringData.choose_a_file), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger",
      onClick: () => removeFile(parentIndex, childIndex)
    }, stringData.remove)))
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => addFile(parentIndex),
    className: "button button-primary"
  }, stringData.add_sectiont)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeSection(parentIndex)
  }, stringData.Delete_a_section)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, files.length === 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addSection,
    className: "button button-primary"
  }, stringData.add_a_section)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion",
    id: uniqueidto
  }, files.map((file, parentIndex) => {
    // Generate a unique clientId for each repeated parent block
    const clientId = `inner-block-${parentIndex}`;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-item",
      key: parentIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "accordion-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `accordion-button collapsed ${parentIndex === 0 ? '' : 'collapsed'}`,
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#collapse-${file.uniqueid}`,
      "aria-expanded": "true",
      "aria-controls": `collapse-${file.uniqueid}`
    }, file.sectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: `collapse-${file.uniqueid}`,
      className: `accordion-collapse collapse `,
      "data-bs-parent": `#${uniqueidto}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "podstrony-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-xl-6 col-md-6",
      key: childIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "podstrony-card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: nestedItem.url,
      class: "podstrony-card-inner d-flex align-items-center flex-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "card-icon"
    }, " ", nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: "icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, nestedItem.title))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, null), file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: file.sectioncontent
      }
    }))));
  })));
}

/***/ }),

/***/ "./src/website-links.js":
/*!******************************!*\
  !*** ./src/website-links.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
const linksvg = myBlockData.linksvg;
registerBlockType('giosnamespace/website-link', {
  title: stringData.website_link,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: []
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "links-block"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.url,
      class: "d-flex align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: linksvg,
      alt: "icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    items,
    slideritems
  } = props.attributes;
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    props.setAttributes({
      items: updatedItems
    });
  }
  function addItem() {
    const newItem = {
      title: 'Communication strategy',
      url: ''
    };
    props.setAttributes({
      items: [...items, newItem]
    });
  }
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        title: 'Communication strategy',
        url: ''
      }]
    });
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    props.setAttributes({
      items: updatedItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "links-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Training_File_Block
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.repeter, " ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.enter_url,
    value: item.url,
    onChange: value => updateItem(index, 'url', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeItem(index),
    className: "button button-danger"
  }, stringData.remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItem,
    className: "button button-primary"
  }, stringData.add_item))), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.url,
    class: "d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: linksvg,
    alt: "icon"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title))))));
}

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.js */ "./src/slider.js");
/* harmony import */ var _slider_coustom_post_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider-coustom-post.js */ "./src/slider-coustom-post.js");
/* harmony import */ var _Shortcuts_block_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shortcuts-block.js */ "./src/Shortcuts-block.js");
/* harmony import */ var _contactmapblock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contactmapblock.js */ "./src/contactmapblock.js");
/* harmony import */ var _naborye_section_block_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./naborye-section-block.js */ "./src/naborye-section-block.js");
/* harmony import */ var _toggle_file_list_block_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toggle-file-list-block.js */ "./src/toggle-file-list-block.js");
/* harmony import */ var _add_title_block_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-title-block.js */ "./src/add-title-block.js");
/* harmony import */ var _Tab_post_block_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Tab-post-block.js */ "./src/Tab-post-block.js");
/* harmony import */ var _post_List_block_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./post-List-block.js */ "./src/post-List-block.js");
/* harmony import */ var _text_titlerepeter_block_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./text-titlerepeter-block.js */ "./src/text-titlerepeter-block.js");
/* harmony import */ var _fancy_gallery_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fancy-gallery.js */ "./src/fancy-gallery.js");
/* harmony import */ var _slider_gallery_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./slider-gallery.js */ "./src/slider-gallery.js");
/* harmony import */ var _Kalendarz_block_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Kalendarz-block.js */ "./src/Kalendarz-block.js");
/* harmony import */ var _Kalendarz_konsultacji_block_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Kalendarz-konsultacji-block.js */ "./src/Kalendarz-konsultacji-block.js");
/* harmony import */ var _Lista_Ekspertw_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Lista-Ekspertw.js */ "./src/Lista-Ekspertw.js");
/* harmony import */ var _icon_heading_block_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./icon-heading-block.js */ "./src/icon-heading-block.js");
/* harmony import */ var _download_file_block_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./download-file-block.js */ "./src/download-file-block.js");
/* harmony import */ var _oder_list_block_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./oder-list-block.js */ "./src/oder-list-block.js");
/* harmony import */ var _Point_for_Nature_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Point-for-Nature.js */ "./src/Point-for-Nature.js");
/* harmony import */ var _Team_all_post_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Team-all-post.js */ "./src/Team-all-post.js");
/* harmony import */ var _contact_block_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./contact-block.js */ "./src/contact-block.js");
/* harmony import */ var _new_filter_post_archive_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./new-filter-post-archive.js */ "./src/new-filter-post-archive.js");
/* harmony import */ var _program_schedule_list_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./program-schedule-list.js */ "./src/program-schedule-list.js");
/* harmony import */ var _podstrony_block_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./podstrony-block.js */ "./src/podstrony-block.js");
/* harmony import */ var _toggle_inner_section_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./toggle-inner-section.js */ "./src/toggle-inner-section.js");
/* harmony import */ var _website_links_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./website-links.js */ "./src/website-links.js");
/* harmony import */ var _map_shortcode_block_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./map-shortcode-block.js */ "./src/map-shortcode-block.js");
/* harmony import */ var _harmonogram_block_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./harmonogram-block.js */ "./src/harmonogram-block.js");
/* harmony import */ var _project_idea_block_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./project-idea-block.js */ "./src/project-idea-block.js");
/* harmony import */ var _profect_idea_question_reject_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./profect-idea-question-reject.js */ "./src/profect-idea-question-reject.js");
/* harmony import */ var _second_mapshortcode_block_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./second-mapshortcode-block.js */ "./src/second-mapshortcode-block.js");




// import './custom-shortcode-postype.js';



























}();
/******/ })()
;
//# sourceMappingURL=index.js.map