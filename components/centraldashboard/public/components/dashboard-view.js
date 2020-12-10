import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import {html, PolymerElement} from '@polymer/polymer';

import css from './dashboard-view.css';
import template from './dashboard-view.pug';
import './card-styles.js';
import './iframe-link.js';
import './notebooks-card.js';
import './pipelines-card.js';
import './resource-chart.js';
import {getGCPData} from './resources/cloud-platform-data.js';

//const DOCS = 'https://www.kubeflow.org/docs';

export class DashboardView extends PolymerElement {
    static get template() {
        return html([`
            <style include="card-styles">
                ${css.toString()}
            </style>
            ${template()}
        `]);
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            documentationItems: {
                type: Array,
                value: [
                    {
                        text: 'Jupyter Notebooks Getting Started',
                        desc: '',
			link: 'https://confluence.fmr.com/display/AICEAC/GPU+Kubeflow+Notebooks+Getting+Started',
                    },
                    {
                        text: 'Create a ReSolV Custom Container Image',
                        desc: '',
                        link: 'https://confluence.fmr.com/display/AICEAC/GPU+Create+a+ReSolV+Custom+Container+Image',
                    },
                    {
                        text: 'Docker Container User Workflow',
                        desc: '',
                        link: 'https://confluence.fmr.com/display/AICEAC/GPU+Docker+Container+User+Workflow',
                    },
                    {
                        text: 'User Support Open a Ticket',
                        desc: '',
                        link: 'https://confluence.fmr.com/display/AICEAC/GPU+User+Support+Open+a+Ticket',
                    },
                    {
                        text: 'Appliance Nvidia Overview',
                        desc: '',
                        link: 'https://confluence.fmr.com/display/AICEAC/GPU+Appliance+Nvidia+Overview',
                    },
                ],
            },
            namespace: String,
            quickLinks: {
                type: Array,
                value: [
                    {
                        text: 'Upload a pipeline',
                        desc: 'Pipelines',
                        link: `/pipeline/`,
                    },
                    {
                        text: 'View all pipeline runs',
                        desc: 'Pipelines',
                        link: `/pipeline/#/runs`,
                    },
                    {
                        text: 'Create a new Notebook server',
                        desc: 'Notebook Servers',
                        link: `/jupyter/new?namespace=kubeflow`,
                    },
                    {
                        text: 'View Katib Studies',
                        desc: 'Katib',
                        link: `/katib/`,
                    },
                    {
                        text: 'View Metadata Artifacts',
                        desc: 'Artifact Store',
                        link: `/metadata/`,
                    },
                ],
            },
            platformDetails: Object,
            platformInfo: {
                type: Object,
                observer: '_platformInfoChanged',
            },
        };
    }

    /**
     * Observer for platformInfo property
     */
    _platformInfoChanged() {
        if (this.platformInfo && this.platformInfo.providerName === 'gce') {
            this.platformName = 'GCP';
            const pieces = this.platformInfo.provider.split('/');
            let gcpProject = '';
            if (pieces.length >= 3) {
                gcpProject = pieces[2];
            }
            this.platformDetails = getGCPData(gcpProject);
        }
    }
}

customElements.define('dashboard-view', DashboardView);
