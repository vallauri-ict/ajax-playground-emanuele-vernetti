# Alpha Vantage
## Developed by Emanuele Vernetti

In questo esercizio possiamo capire il funzionamento delle chiamate Ajax e in questo caso andremo ad utilizzare un'API fornita da Alpha Vantage (https://www.alphavantage.co/) che ci permette di andare a visualizzare le quotazioni in borsa di varie aziende.

La pagina è divisa in varie sezioni:
![preview](https://user-images.githubusercontent.com/61801458/82310971-5e6c8a00-99c5-11ea-8af0-52254ba4def8.PNG)



1- In alto, abbiamo una barra di navigazione creata tramite Bootstrap che ci consente di tornare alla Home e attraverso due pulsanti posizionati sul lato destro di essa, abbiamo la possibilità di effettuare il Log In/ Log Out al nostro account Google, in quanto tramite questa pagina è possibile andare a caricare dei file sul proprio account Google, in particolare nella propria cartella di Google Drive.
![navbar](https://user-images.githubusercontent.com/61801458/82310149-4f390c80-99c4-11ea-846a-8279903eb568.PNG)


2- Dopodichè, abbiamo una Combobox che ci permette di andare a scegliere un'azienda tra quelle proposte e visualizzarne i relativi dati nella tabella sottostante. Altrimenti, c'è la possibilità di andare ad inserire una chiave di ricerca nella TextBox posta a fianco della ComboBox e nella tabella verranno visualizzati i risultati delle prime quattro aziende che vengono trovate.
##### N.B.: Vengono visualizzate soltanto quattro aziende in quanto AlphaVantage impone un limite di chiamate pari a 5/min e 500/giorno.
![combo and text boxes](https://user-images.githubusercontent.com/61801458/82310385-9aebb600-99c4-11ea-8314-49ad2c1a70ec.PNG)


3- Al di sotto, sul lato sinistro della pagina troviamo una ComboBox che ci permette di andare a visualizzare un grafico con in dati relativi all'andamento di un'azienda in un determinato periodo di tempo. Il grafico è poi scaricabile attraverso un pulsante posto al di sotto che ci consente di salvare il grafico in un file con estensione -jpg sul nostro PC.
![chart](https://user-images.githubusercontent.com/61801458/82310485-bce53880-99c4-11ea-901e-24952332637d.PNG)


4- Infine, sul lato destro della pagina, troviamo la sezione relativa a Google Drive che ci consente (se è stato effettuato il Log In) di andare a caricare il file del grafico (o anche un altro file) all'interno della nostra cartella personale di Google Drive ("Il mio Drive").
![drive](https://user-images.githubusercontent.com/61801458/82310545-d4bcbc80-99c4-11ea-82b3-23937b2eb52e.PNG)

Per informazioni aggiuntive: e.vernetti.1033@vallauri.edu
