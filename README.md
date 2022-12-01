# Estudo de ```<canvas>```
Estudo de HTML Canvas, a partir do vídeo <a href="https://youtu.be/vAJEHf92tV0" target="_blank">Learn HTML Canvas: Pixels & Physics</a> de Frank´s Laboratory. Pelo nome do canal, vou chamar o instrutor de Frank, pois não lembro de ele ter se apresentado.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Estudo de Html Canvas**
| :label: Tecnologias | HTML, CSS, Javascript
| :rocket: URL         | https://enyus.github.io/canvasstudy/

<!-- Inserir imagem com a #vitrinedev ao final do link -->
![](https://media.giphy.com/media/YjgNtUi04yG8AtZvcY/giphy-downsized.gif#vitrinedev)

# Detalhes do Projeto

## Imagem
Deve-se usar uma imagem convertida em base 64 (imagem em código), o que pode ser feito através de sites <a href="https://www.base64-image.de/encode" target="_blank">como este</a>. Isso é necessário para podermos ler as propriedades da imagem pixel a pixel.

## Funções interessantes no ```<canvas>```
Abaixo vou listar algumas funções e proriedades interessantes do canvas, para fácil acesso futuro.

### ```.fillRect(x, y, width, height)```
Desenha um retângulo com ponto inicial (x,y) em relação ao canvas (lembrando que x é a medida horizontal, que é zero na lateral esquerda e aumenta conforme se vai para a direita da página; e y é a distância vertical do início do retângulo, que é 0 no topo da página e aumenta conforme a imagem está mais para baixo) e largura de width pixels e altura de height pixels.
- <a href="https://developer.mozilla.org/pt-BR/docs/Web/API/CanvasRenderingContext2D/fillRect" target="_blank">MDN</a>

### ```.drawImage(src, x, y (, width, height) )```
Desenha uma imagem de fonte ```src``` com ponto inicial (x, y) em relação ao canvas. As propriedades width e height são opcionais, permitindo a alteração do tamanho de largura e altura da imagem, respectivamente.
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage" target="_blank">MDN</a>
- É recomendado o uso de sua imagem em seu tamanho original. Qualquer redimencionamento é melhor aceito pelo canvas se for feito no próprio arquivo de imagem com um editor de imagens.

### ```window.requestAnimationFrame(callback)```
É um método usado em conjunto com funções de animações (callback). Pelo que entendi, gera um loop automaticamente (geralmente 60 vezes por segundo, 60fps, velocidade que pode ser alterada automaticamente para questões de performance do navegador) uma função de animação ```callback```.
- <a href="https://developer.mozilla.org/pt-BR/docs/Web/API/Window/requestAnimationFrame" target="_blank">MDN</a>
- É recomendado que a função de animação se inicie com ctx.clearRect para limpar o frame anterior da animação, caso contrário, os frames vão se sobrepor.

### ```.clearRect(x, y, width, height)```
Usada para limpar um ```<canvas>``` (na verdade, transforma os pixels em transparentes) com início em (x, y) e por uma largura de width e altura de height.
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect" target="_blank">MDN</a>

### ```.getImageData(x, y, width, height)```
Usada para analisar uma parte de um ```<canvas>``` a partir do ponto inicial (x, y) e por uma largura de width e altura de height.
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData" target="_blank">MDN</a>
- É aqui que importa o uso da imagem em base 64, pois evita um erro de "canvas tainted by cross origin data".
- Retorna um array com as informações de cor e opacidade de cada pixel (cada conjunto de 4 números é a representação rgba do pixel).


# O problema do mobile
O vídeo se trata unicamente do movimento de mouse, então descarta qualquer possibilidade de funcionamento com mobile. Após alguns testes rápidos, é possível notar que existem dois problemas principais:
- Performance (o código fica muito mais lento quando rodado num aparelho mobile - ou no meu, pelo menos haha)
- Tracing (o evento de touch não segue as mesmas propriedades do evento de mouse, então por padrão o código só "capta" o mouse no primeiro touch)
Ainda não resolvi o problema de performance, mas o tracing foi razoavelmente simples:

## Eventos de Toque
Como mencionado anteriormente, o tracing do toque dos aparelhos mobile não seguem as mesmas regras do mouse, assim, foi necessário adicionar um segundo eventListener na função ```constructor``` da classe ```Effect``` para compensar, basicamente só sobrescrevendo a posição do "mouse" (certamente essa não deve ser a solução mais refinada, mas funciona por enquanto). <br><br>
Código adicionado:
```
window.addEventListener('touchmove', event => {
                this.mouse.x = event.targetTouches[0].clientX;
                this.mouse.y = event.targetTouches[0].clientY;
            })
```

Adicionei ainda um terceiro eventListener para que quando o toque cessasse, o "mouse" fictício voltasse à origem, para que a animação pudesse seguir seu curso normalmente. (mas ainda não funciona quando o usuário apenas dá um clique com o toque).<br>
```
window.addEventListener('touchend', event => {
                this.mouse.x = 0;
                this.mouse.y = 0;
            })
```

## O Problema de Performance no mobile nem é tão perceptível se vc tiver um celular top:
<img src="https://media.giphy.com/media/5xtAxtvNdyV6nd2kWF/giphy-downsized.gif" alt="rodando o aplicativo em um celular top">
