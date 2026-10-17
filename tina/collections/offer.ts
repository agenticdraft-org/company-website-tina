import type { Collection, TinaField } from 'tinacms';

/**
 * The "Our offer" page. Same modelling decision as the home and story pages: a
 * fixed set of sections with editable copy rather than a reorderable block
 * list, so the layout can't be broken from the CMS.
 *
 * Services, stack groups and price plans are lists because their number
 * genuinely changes as the offer does; everything around them is fixed.
 */

// Eyebrow + two-line heading + intro. Every section on the page opens with it,
// matching the Approach and Workflow sections on the home page.
const sectionIntroFields: TinaField[] = [
	{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
	{ name: 'heading', label: 'Heading', type: 'string' },
	{
		name: 'headingLine2',
		label: 'Heading — second line',
		type: 'string',
		description: 'Rendered on a new line. Leave blank for a single-line heading.',
	},
	{ name: 'intro', label: 'Intro paragraph', type: 'string', ui: { component: 'textarea' } },
];

export const OfferCollection: Collection = {
	name: 'offer',
	label: 'Our offer',
	path: 'src/content/offer',
	format: 'json',
	// Locale folders: `en/offer`, `de/offer`, …
	match: { include: '*/offer' },
	ui: {
		// The first path segment is the locale, so the admin's "view page" link
		// lands on the right language.
		router: ({ document }) => {
			const locale = document._sys.relativePath.split('/')[0];
			return locale === 'en' ? '/offer/' : `/${locale}/offer/`;
		},
	},
	fields: [
		{
			name: 'seoTitle',
			label: 'Meta Title (SEO)',
			type: 'string',
			isTitle: true,
			required: true,
			description:
				'Shown in the browser tab and search results — not on the page itself.',
		},
		{
			name: 'seoDescription',
			label: 'Meta Description (SEO)',
			type: 'string',
			ui: { component: 'textarea' },
			description: 'Used for search results and social-sharing previews.',
		},

		{
			name: 'hero',
			label: 'Opening',
			type: 'object',
			fields: [
				{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
				{ name: 'heading', label: 'Heading', type: 'string' },
				{
					name: 'headingAccent',
					label: 'Heading — accent line',
					type: 'string',
					description:
						'Rendered on a new line, in cyan. Leave blank for a single-line heading.',
				},
				{
					name: 'lede',
					label: 'Intro paragraph',
					type: 'string',
					ui: { component: 'textarea' },
				},
			],
		},

		{
			name: 'services',
			label: 'What we offer',
			type: 'object',
			fields: [
				...sectionIntroFields,
				{
					name: 'items',
					label: 'Services',
					type: 'object',
					list: true,
					ui: { itemProps: (item) => ({ label: item?.title }) },
					fields: [
						{
							name: 'label',
							label: 'Label',
							type: 'string',
							description: 'Short mono line above the title, e.g. "We build it".',
						},
						{ name: 'title', label: 'Title', type: 'string' },
						{ name: 'body', label: 'Body', type: 'string', ui: { component: 'textarea' } },
						{
							name: 'outcome',
							label: 'You receive',
							type: 'string',
							description: 'What the client holds at the end. One line.',
						},
					],
				},
				{
					name: 'outcomeLabel',
					label: '"You receive" label',
					type: 'string',
					description: 'The small label in front of each service\'s outcome line.',
				},
				{
					name: 'exclusions',
					label: 'What we don\'t do',
					type: 'string',
					ui: { component: 'textarea' },
					description: 'One honest line under the services. Leave blank to hide.',
				},
			],
		},

		{
			name: 'stack',
			label: 'Our tech stack',
			type: 'object',
			fields: [
				...sectionIntroFields,
				{
					name: 'groups',
					label: 'Groups',
					type: 'object',
					list: true,
					ui: { itemProps: (item) => ({ label: item?.title }) },
					fields: [
						{ name: 'title', label: 'Title', type: 'string' },
						{
							name: 'depth',
							label: 'Depth',
							type: 'string',
							description:
								'How deep the team goes here, e.g. "Years in production" or "Working knowledge". Keep it honest — this is the line a client checks.',
						},
						{ name: 'items', label: 'Technologies', type: 'string', list: true },
					],
				},
			],
		},

		{
			name: 'pricing',
			label: 'Our prices',
			type: 'object',
			fields: [
				...sectionIntroFields,
				{
					name: 'plans',
					label: 'Plans',
					type: 'object',
					list: true,
					ui: { itemProps: (item) => ({ label: item?.name }) },
					fields: [
						{ name: 'name', label: 'Name', type: 'string' },
						{
							name: 'price',
							label: 'Price',
							type: 'string',
							description: 'Free text so it can read "€7,350" or "from €80".',
						},
						{
							name: 'unit',
							label: 'Unit',
							type: 'string',
							description: 'e.g. "fixed fee", "per engineer, per hour", "per month".',
						},
						{ name: 'body', label: 'Body', type: 'string', ui: { component: 'textarea' } },
						{ name: 'includes', label: 'Included', type: 'string', list: true },
						{
							name: 'highlight',
							label: 'Highlight this plan',
							type: 'boolean',
							description: 'Draws the plan with the accent border. Use on one plan at most.',
						},
					],
				},
				{
					name: 'terms',
					label: 'Terms',
					type: 'string',
					ui: { component: 'textarea' },
					description: 'The small print under the plans: VAT, third-party costs, payment terms.',
				},
			],
		},

		{
			name: 'closing',
			label: 'Closing call to action',
			type: 'object',
			fields: [
				{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
				{ name: 'heading', label: 'Heading', type: 'string' },
				{
					name: 'headingAccent',
					label: 'Heading — accent line',
					type: 'string',
					description: 'Rendered on a new line, in cyan.',
				},
				{
					name: 'cta',
					label: 'Button',
					type: 'object',
					fields: [
						{ name: 'label', label: 'Label', type: 'string' },
						{ name: 'href', label: 'Link', type: 'string' },
					],
				},
			],
		},
	],
};
