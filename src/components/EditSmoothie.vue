<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2 >Edit a smoothie {{smoothie.title}} Smoothie</h2>
    <!-- form for edit smoothie component -->
     <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredients:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>


      </div>
       <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{feedback}}</p>
        <button class="btn pink">Update smoothie</button>
      </div>

    </form>
  </div>

</template>

<script>
import db from "@/firebase/init"
import slugify from 'slugify'
export default {
  name:"EditSmoothie",
  data(){
    return{
      smoothie:null,
      another:null,
      feedback:null
    }
  },
  created(){
    let ref=db.collection('smoothies').where('slug','==',this.$route.params.smoothie_slug)
    ref.get().then(snapshot=>{
      snapshot.forEach(element => {
       console.log(element.data()) 
       this.smoothie=element.data()
       this.smoothie.id=element.id
      });
    })
  },
  methods:{
     addIngredient(){
      if(this.another){
        this.smoothie.ingredients.push(this.another)
        // console.log(this.ingredients)
        this.another=null
        this.feedback=null
      }else{
        this.feedback="You must enter a value to  enter an ingredient"
      }
    },
    deleteIngredient(ingredient){
      this.smoothie.ingredients=this.smoothie.ingredients.filter(ingredient=>{
        return ingredient!=ingredient
      })
    },
    EditSmoothie(){
       if(this.smoothie.title){
        this.feedback=null;
        //create slug
        this.smoothie.slug=slugify(this.smoothie.title, {replacement:'-',remove:/[$*_+~.()'"!\-:#]/g, lower:true})
        db.collection('smoothies').doc(this.smoothie.id).update({
          title:this.smoothie.title,
          ingredients:this.smoothie.ingredients,
          slug:this.smoothie.slug
        }).then(()=>{
          this.$router.push({name:'Index'})
        }).catch(e=>console.log(e))
      }else{
        this.feedback="You must enter a smoothie title"
      }
    }
  }
}
</script>
<style scoped>
.edit-smoothie{
  margin-top:60px;
  padding:20px;
  max-width:500px;
}
.edit-smoothie h2{
  font-size:2rem;
  margin:20px auto;
}
.edit-smoothie .field{
  margin:20px auto;
  position: relative
}
.red-text{
  color: red;
}
.edit-smoothie .delete{
  position :absolute;
  right:0;
  bottom:16px;
  color:#333;
  font-size: 1.4rem;
  cursor: pointer;
}
</style>

