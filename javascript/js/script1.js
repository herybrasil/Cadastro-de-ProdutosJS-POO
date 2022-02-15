class Produto{

    constructor(){   
        this.id = 0;
        this.arrayProducts = [];
        this.editId = null;
    }

    
 
    salvar(){
        let produto = this.lerDados();
        if(this.validaCampos(produto)) {
            if(this.editId == null){
                this.adicionar(produto); 
            }else{
                this.atualizar(this.editId, produto);
            }
           
        }
      
        this.tableList();
        this.cancelar();
    }

    tableList(){
        let t_table = document.getElementById('t_table');
        t_table.innerText = '';

        for(let i = 0; i < this.arrayProducts.length; i++){
            let tr = t_table.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor= tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProducts[i].id;
            td_produto.innerText = this.arrayProducts[i].nomeProduto;
            td_valor.innerText = this.arrayProducts[i].preco;

            td_id.classList.add('center')

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/img.edit.png';
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProducts[i]) +")");


            let imgDel = document.createElement('img');
            imgDel.src = 'img/img.delete.png';
            imgDel.setAttribute("onclick", "produto.deletar("+this.arrayProducts[i].id+")");


            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDel);
            
        
        }

    }


    adicionar(produto){
        produto.preco = parseFloat(produto.preco)
        this.arrayProducts.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for (let i = 0; i < this.arrayProducts.length; i++) {
            if(this.arrayProducts[i]. id == id){
                this.arrayProducts[i].nomeProduto = produto.nomeProduto;
                this.arrayProducts[i].preco = produto.preco;
            }          
        }
    }


    preparaEdicao(dados){

        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';
    }




    lerDados(){
      let produto = {}

       produto.id = this.id;
       produto.nomeProduto = document.getElementById('produto').value;
       produto.preco = document.getElementById('preco').value;

      return produto;
    }

    


    validaCampos(produto){
        let msg = '';

        if(produto.nomeProduto == ''){
            msg += ('- Informe o nome do produto \n')
        }

        if(produto.preco == ''){
            msg += ('- Informe o preço do produto \n')
        }
    
        if(msg != ''){
            alert(msg);
            return false
        }

        return true;
    }
      

    cancelar(){
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = ''; 


        document.getElementById('btn1').innerText = 'Salvar';

        this.editId = null;
     
    }

    deletar(id){

        if (confirm('Deseja realizar exclusão?')){
            
        let t_table = document.getElementById('t_table');
        for(let i = 0; i <this.arrayProducts.length; ++i) {
            if(this.arrayProducts[i].id == id) {
                this.arrayProducts.splice(i,1);
                t_table.deleteRow(i);              
              }
           } 
       }  
    }
}
        

        var produto = new Produto();