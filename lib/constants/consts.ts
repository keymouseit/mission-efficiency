let ZOOM = 1.2;
let MAX_ZOOM = 5;
const browserWidth = globalThis.innerWidth;
if (browserWidth && window) {
  ZOOM = window?.innerWidth > 768 ? Number(1.2) : Number(1.1);
  MAX_ZOOM = window?.innerWidth > 768 ? Number(5) : Number(9);
}
const MAP_CENTER = [0, 55] as [number, number];

const MAP_LEGENDS = [
  {
    value: "moderate",
    color: "#53FFCA",
    discription:
      "Potential for energy savings is moderate. Additional energy savings are possibly, commonly through improved market transformation. Review energy efficiency policies, raise ambition and commitments.",
  },
  {
    value: "moderate to high",
    color: "#4BE4DB",
    discription:
      "Potential for energy savings is moderate to high. Improve existing and develop new energy efficiency policies that fill existing policy gaps. Increase knowledge and investment in research and development.",
  },
  {
    value: "high",
    color: "#40C9E7",
    discription:
      "Potential for energy savings is high. Develop energy efficiency policies that fill existing policy gaps. Improve knowledge, skills, and expertise in energy efficiency. Set long-term goals and ambitions e.g. setting NDCs.",
  },
  {
    value: "high to significant",
    color: "#298AE4",
    discription:
      "Potential for energy savings is high to significant. Increased knowledge and awareness of energy efficiency benefits by key stakeholders. Assessment of energy efficiency opportunities. Development of energy efficiency strategies and roadmaps.",
  },
  {
    value: "significant",
    color: "#4441EB",
    discription:
      "Potential for energy savings is significant. Raising awareness on energy efficiency benefits are paramount at this stage. Countries are encouraged to convene stakeholders and identify new energy efficiency policies that could support an enabling environment for investment in energy efficiency.",
  },
  {
    value: "vast",
    color: "#1627C1",
    discription:
      "Potential for energy savings is vast. Immediate action is required to capture energy efficiency potential in the short term. Raising awareness on energy efficiency benefits are paramount at this stage. Countries are encouraged to make energy efficiency data and analysis available to better understand immediate opportunities and cost-effective measures for energy efficiency in the sector.",
  },
];

const SECTORS_LIST = [
  {
    title: "Residential",
    field_name: "field_residential_score",
    icon: "homeIcon",
  },
  { title: "Industry", field_name: "field_industry_score", icon: "dollar" },
  {
    title: "Commercial and public services",
    field_name: "field_services_score",
    icon: "chart",
  },
  { title: "Transport", field_name: "field_transport_score", icon: "bus" },
  {
    title: "Electricity distribution and transmission",
    field_name: "field_electricity_and_heat_score",
    icon: "bulb",
  },
];

const ANNUAL_IMPROVEMENT_KEYS: { [key: string]: string } = {
  field_country_score: "field_ai_country",
  field_electricity_and_heat_score: "field_ai_electricity_and_heat",
  field_industry_score: "field_ai_industry",
  field_residential_score: "field_ai_residential",
  field_services_score: "field_ai_service",
  field_transport_score: "field_ai_transport",
};

const MONTHS_LIST = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const YEAR_LIST = [
  { label: "2007", value: "2007" },
  { label: "2008", value: "2008" },
  { label: "2009", value: "2009" },
  { label: "2010", value: "2010" },
  { label: "2011", value: "2011" },
  { label: "2012", value: "2012" },
  { label: "2013", value: "2013" },
  { label: "2014", value: "2014" },
  { label: "2015", value: "2015" },
  { label: "2016", value: "2016" },
  { label: "2017", value: "2017" },
  { label: "2018", value: "2018" },
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
];

const NEWS_AND_TRAINING_KEY_MAPPINGS = {
  title: ["title"],
  date: ["field_t_date", "field_news_date"],
  description: ["field_news_blurb"],
  language: ["field_t_language"],
  link: ["field_t_link", "field_news_link"],
  modality: ["field_t_modality"],
  organisation: ["field_t_organization"],
  region: ["field_t_region"],
  resource: ["field_t_resource", "field_n_resource"],
  sector: ["field_t_sector"],
  topic: ["field_t_topic"],
  // image: ['field_training_image', 'field_news_image'],
  // video: ['field_youtube_video_url', 'field_news_youtube_video_url'],
  // document: ['field_training_pdf_url', 'field_news_pdf_url'],
  media: ["field_t_media_url", "field_news_media_url"],
};

const LANGUAGE_CODE = {
  english: "EN",
  spanish: "ES",
  french: "FR",
  chinese: "ZH",
  portuguese: "PT",
};

export const CONSTS = {
  ZOOM,
  MAX_ZOOM,
  MAP_CENTER,
  MAP_LEGENDS,
  SECTORS_LIST,
  ANNUAL_IMPROVEMENT_KEYS,
  MONTHS_LIST,
  YEAR_LIST,
  NEWS_AND_TRAINING_KEY_MAPPINGS,
  LANGUAGE_CODE,
};

export const SLIDER_DATA = {
  autoPlayScroll: false,
  infinite: true,
  speed: 2000,
  autoplaySpeed: 5000,
  dots: true,
  arrows: true,
  mainTitle: "Single Slider Title",
  viewButton: {
    link: "#",
    title: "View All",
  },
  slides: [
    {
      status: true,
      title:
        "Global Coalition Calls for Stronger Progress on Energy Efficiency at COP 29",
      created: "2024-11-13T09:55:44+00:00",
      changed: "2024-11-14T12:48:26+00:00",
      promote: true,
      sticky: false,
      field_slider_blurb: {
        value:
          "<p>At COP 29, coalition of countries, businesses and organizations is urging world leaders to prioritize energy efficiency...</p>",
        format: "basic_html",
        processed:
          "<p>At COP 29, coalition of countries, businesses and organizations is urging world leaders to prioritize energy efficiency...</p>",
      },
      field_slider_date: "2024-11-16",
      field_slider_media_url:
        "https://www.seforall.org/sites/default/files/styles/full_content_desktop/public/2024-11/ME-social-v3.png",
      field_link: "#",
      field_link_text: "Learn more",
    },
    {
      status: true,
      title: "This is How Mission Efficiency is Redefining Energy Efficiency",
      created: "2024-10-29T14:04:56+00:00",
      changed: "2024-10-29T14:10:21+00:00",
      promote: true,
      sticky: false,
      field_slider_blurb: {
        value: "",
        format: "basic_html",
        processed: "",
      },
      field_slider_date: "2024-10-22",
      field_slider_media_url: "",
      field_link: "#",
      field_link_text: "Learn more",
    },
  ],
};
export const TEMPLATES_DESCRIPTION_CARDS = {
  mainTitle: "Energy Efficiency Initiatives",
  subTitle: "this is a subtitle",
  cards: [
    {
      id: "62b734da-bb34-413f-a0c9-2f7decb8aa55",
      title: "Elevate energy efficiency",
      created: "2023-12-15T06:10:14+00:00",
      changed: "2023-12-15T06:13:54+00:00",
      promote: true,
      field_content: {
        value:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
        format: "basic_html",
        processed:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
      },
      imageUrl: "/sites/default/files/2023-12/elevate-icon.png",
      imageAlt: "Elevate",
    },
    {
      id: "78280361-abf9-47fa-851a-b5f70e511e6f",
      title: "Support energy efficiency",
      created: "2023-12-15T06:14:07+00:00",
      changed: "2023-12-15T06:14:47+00:00",
      promote: true,
      field_content: {
        value:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
        format: "basic_html",
        processed:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
      },
      imageUrl: "/sites/default/files/2023-12/support-icon.png",
      imageAlt: "Support",
    },
    {
      id: "a8466f6c-392b-4699-bce1-faba70deb50f",
      title: "Invest in energy efficiency",
      created: "2023-12-15T06:14:07+00:00",
      changed: "2023-12-15T06:15:23+00:00",
      promote: true,
      field_content: {
        value:
          "<p>Project implementation funding for coordinated action through loans, grants.</p>",
        format: "basic_html",
        processed:
          "<p>Project implementation funding for coordinated action through loans, grants.</p>",
      },
      imageUrl: "/sites/default/files/2023-12/invest-icon.png",
      imageAlt: "Invest",
    },
    {
      id: "78280361-abf9-47fa-851a-b5f70e511e6f",
      title: "Support energy efficiency",
      created: "2023-12-15T06:14:07+00:00",
      changed: "2023-12-15T06:14:47+00:00",
      promote: true,
      field_content: {
        value:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
        format: "basic_html",
        processed:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
      },
      imageUrl: "/sites/default/files/2023-12/support-icon.png",
      imageAlt: "Support",
    },
    {
      id: "62b734da-bb34-413f-a0c9-2f7decb8aa55",
      title: "Elevate energy efficiency",
      created: "2023-12-15T06:10:14+00:00",
      changed: "2023-12-15T06:13:54+00:00",
      promote: true,
      field_content: {
        value:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
        format: "basic_html",
        processed:
          "<p>In personal, organizational and global agendas - a clear narrative that supports progress, convening partners, matching solution offers and advocating for energy efficiency.</p>",
      },
      imageUrl: "/sites/default/files/2023-12/elevate-icon.png",
      imageAlt: "Elevate",
    },
  ],
};
export const TEMPLATE_MULTI_SLIDER = {
  mainTitle: "Multi slider",
  autoPlayScroll: false,
  infinite: true,
  speed: 1500,
  dots: true,
  arrows: true,
  slidesToScroll: 2,
  slidesToShow: 2,
  multiSlides: [
    {
      title: "Mission Efficiency Partnership and campaign",
      created: "2023-12-15T06:18:56+00:00",
      changed: "2024-03-26T11:04:37+00:00",
      status: true,
      field_year: "2022",
      field_content: {
        value: "<p>Evolution of Three Percent Club</p>",
        processed: "<p>Evolution of Three Percent Club</p>",
      },
      field_link: "https://unepccc.org/mission-efficiency-officially-launched/",
      field_image_icon: {
        uri: {
			url: "/sites/default/files/2023-12/Timeline-item-4-SEforALL-review.jpg",
		}
      },
    },
	{
		title: "Three club",
		created: "2023-12-15T06:18:56+00:00",
		changed: "2024-03-26T11:04:37+00:00",
		status: true,
		field_year: "2022",
		field_content: {
		  value: "<p>A collaboration of governments and organizations launched at the Global Climate Action Summit with the goal to put the world on a path to three percent annual efficiency improvement</p>",
		  processed: "<p>A collaboration of governments and organizations launched at the Global Climate Action Summit with the goal to put the world on a path to three percent annual efficiency improvement</p>",
		},
		field_link: "https://unepccc.org/mission-efficiency-officially-launched/",
		field_image_icon: {
		  uri: {
			  url: "/sites/default/files/2023-12/Timeline-item-4-SEforALL-review.jpg",
		  }
		},
	  },
	  {
		title: "Mission Efficiency",
		created: "2023-12-15T06:18:56+00:00",
		changed: "2024-03-26T11:04:37+00:00",
		status: true,
		field_year: "2022",
		field_content: {
		  value: "<p>Evolution</p>",
		  processed: "<p>Evolution</p>",
		},
		field_link: "https://unepccc.org/mission-efficiency-officially-launched/",
		field_image_icon: {
		  uri: {
			  url: "/sites/default/files/2023-12/Timeline-item-4-SEforALL-review.jpg",
		  }
		},
	  },
  ],
};
