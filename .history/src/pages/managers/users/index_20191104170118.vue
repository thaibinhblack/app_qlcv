<template>
    <section id="section-users">
        
        
         <JqxGrid 
            :width="getWidth"
             :source="dataAdapter" 
             :columns="columns" :columnsresize="true" 
             :pageable="true">    
    </JqxGrid>
    </section>
</template>

<script>
    import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
    export default {
        components: { JqxGrid },
        data() {
            return {
                getWidth: getWidth('grid'),        
                dataAdapter: new jqx.dataAdapter(this.source), 
                columns: [            
                { text: 'Name', datafield: 'name', width: 250 }, 
                { text: 'Beverage Type', datafield: 'type', width: 250 },
                { text: 'Calories', datafield: 'calories', width: 180 },
                { text: 'Total Fat', datafield: 'totalfat', width: 120 },      
                { text: 'Protein', datafield: 'protein', minwidth: 120 }  
                ]    
            }
        },
        watch: {
            rule_selected(newVal)
            {
                if(newVal == 'all')
                {
                    this.data = this.data_tmp
                }
                else
                {
                    this.data =this.data_tmp.filter((value, index,array) => {
                        return array[index].ID_RULE == newVal
                    })
                }
            },
            search(newVal)
            {
                if(newVal != '')
                {   
                    const search = '/'+newVal+'/i'
                    this.data = this.data_tmp.filter((value,index,array) => {
                        return array[index].USERNAME.match(search)
                    })
                }
                else
                {
                    this.data = this.data_tmp
                }
                
                //  var str = "Visit W3Schools";
                // var patt = /w3schools/i;
                // var result = str.match(patt);
            }
        },
        methods:
        {
            api_rules()
            {
                this.$http.get(this.$store.state.config.API_URL + 'rules?api_token='+this.$session.get('token')).then((response) => {
                    this.rules = response.data.results
                })
            },
            api_users()
            {
                this.$http.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                    this.data = response.data.result
                    this.data_tmp = response.data.result
                })
            },
            edit(ID)
            {
                alert(ID)
            },
            next()
            {

            }
        },
        created()
        {
            this.api_users()
            this.api_rules()
        }
    }
</script>

<style scoped>
#section-users {padding: 50px 0;}
</style>

