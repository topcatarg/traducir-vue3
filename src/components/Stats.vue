<template>
    <div className="row text-center">
            <div className="col d-none d-lg-block">
                <b-button-group>
                    <b-button variant="outline-secondary" disabled>
                        {{GetStatstotalStrings}} total strings
                    </b-button>
                    <b-button variant="danger" v-if="Number.isInteger(GetStatsurgentStrings) && GetStatsurgentStrings > 0">
                        {{GetStatsurgentStrings}} marked as urgent
                    </b-button>
                    <b-button variant="outline-danger">
                        {{GetStatswithoutTranslation}} without translation
                    </b-button>
                    <b-button variant="outline-primary">
                        {{GetStatswaitingApproval}} suggestions awaiting approval
                    </b-button>
                    <b-button variant="outline-success">
                        {{GetStatswaitingReview}} approved suggestions awaiting review
                    </b-button>
                </b-button-group>
            </div>
            
<!--             <div className="col d-lg-none">
                 <div className="btn-group-vertical" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-secondary" disabled>{this.props.stats.totalStrings} total strings</button>
                    {this.props.stats.urgentStrings > 0 &&
                        <Link to="/filters?urgencyStatus=1" className="btn btn-danger">{this.props.stats.urgentStrings} marked as urgent</Link>
                    }
                    <Link to="/filters?translationStatus=2" className="btn btn-outline-danger">{this.props.stats.withoutTranslation} without translation</Link>
                    <Link to="/filters?suggestionsStatus=3" className="btn btn-outline-primary">{this.props.stats.waitingApproval} suggestions awaiting approval</Link>
                    <Link to="/filters?suggestionsStatus=4" className="btn btn-outline-success">{this.props.stats.waitingReview} approved suggestions awaiting review</Link>
                </div>
            </div>-->
        </div>
</template>

<script lang="ts">
import store from '@/store';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class StatComponent extends Vue {
    get GetStatstotalStrings(): number {
        return this.$store.getters.GetStatstotalStrings;
    }
    get GetStatsurgentStrings(): number {
        return this.$store.getters.GetStatsurgentStrings;
    }
    get GetStatswaitingApproval(): number {
        return this.$store.getters.GetStatswaitingApproval;
    }
    get GetStatswithoutTranslation(): number {
        return this.$store.getters.GetStatswithoutTranslation;
    }
    get GetStatswaitingReview(): number {
        return this.$store.getters.GetStatswaitingReview;
    }
}
</script>

