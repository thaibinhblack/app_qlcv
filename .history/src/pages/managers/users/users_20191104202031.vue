<template>    
    <JqxGrid >    
    </JqxGrid>
</template>

<script>
export default {
    data: function () {    
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
}
}
</script>