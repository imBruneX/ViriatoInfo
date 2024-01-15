Swal.bindClickHandler();
/* Bind a mixin to a click handler */
Swal.mixin({
  toast: true
}).bindClickHandler("data-swal-toast-template");

(function($) {

	"use strict";

})(jQuery);

const dados = [
	{
		id: 1,
		sn: "58934Y95839",
		router: "Contém",
		damage: "Muito visivel",
		creator: "Buno Madeira",
		state: "Pronto"
	},
	{
		id: 2,
		sn: "Sou o numero de serie",
		router: "Não",
		damage: "Nenhum",
		creator: "Buno Madeira",
		state: "Em analise"
	},
]


const tbody = document.getElementById('tablebuno');

dados.forEach(dado => {
	const element = document.createElement('tr')

	const type = dado.state == "Pronto" ? "btn-success" : "btn-warning";

	element.innerHTML= `
	<tr>
		<td>${dado.id}</td>
		<td>${dado.sn}</td>
		<td>${dado.router}</td>
		<td>${dado.damage}</td>
		<td>${dado.creator}</td>
		<td><a href="#" class="btn textbuno ${type}">${dado.state}</a></td>
	</tr>
	`

	tbody.append(element)
	
})

async function criar() {
    const { value: formValues } = await Swal.fire({
      title: "Criação Kit Informático",
      html: `
	  	<div class="input-container">
			<input id="swal-input1" class="swal2-input" placeholder="Numero de serie">
			<input id="swal-input1" class="swal2-input" placeholder="Danos">
			<select id="swal-select" class="swal2-select">
				<option value="tem">Tem Router</option>
				<option value="naotem">Não tem Router</option>
			</select>
			<select id="swal-select" class="swal2-select">
				<option value="Muito_Visivel">Estragos Muito Visiveis</option>
				<option value="Visivel">Estragos Visiveis</option>
				<option value="Nao_Visivel">Estragos Não Visiveis</option>
			</select>
			<select id="swal-select" class="swal2-select">
				<option value="completo">Completo</option>
				<option value="incompleto">Incompleto</option>
				<option value="danificado">Danificado</option>
			</select>
		</div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-select").value
        ];
      }
    });
    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }