window.UI = {}

# ================== Header =========================
Advertisement = React.createClass
	closeAd: (e) ->
		#e.preventDefault()
		$('.ad')
			.fadeOut 280
		@props.onAdClosed()

	render: ->
		<div className="ad">
			<a className="close_btn" onClick={@closeAd}></a>
	
			<a className="content" href={@props.url}>
				<img src={@props.imgUrl} />
			</a>
		</div>

NavBar = React.createClass
	render: ->
		<nav className="navbar">
			<div className="logo">
				<i className="full-width"></i>
			</div>
			<div className="rightMenu">
				<NavLink type="user" />
				<NavLink type="search" />
				<NavLink type="menu" />
				<NavLink type="app">客户端</NavLink>
			</div>
		</nav>
NavLink = React.createClass
	render: ->
		<a className={"#{@props.type} item"} href={@props.url}>{@props.children}</a>

Header = React.createClass
	handleAdClosing: ->
		@props.adChangeStatus()
	render: ->
		<header className="top">
			<Advertisement url="/assets/images/ad.png" imgUrl="/assets/images/ad.png" onAdClosed={@handleAdClosing}/>
			<NavBar />
		</header>

# ================= Content Body ==================
MainContent = React.createClass
	getInitialState: ->
		adShowing: @props.adShowing
	reactForAdvertisement: ->
		if @props.adShowing
			return 134
		else
			0
	render: ->
		<div className="main" style={ marginTop: "#{@reactForAdvertisement()}px"}></div>



# ================= App ===========================
App = React.createClass
	getInitialState: ->
		adShowing: true
	handleAdChangeStatus: ->
		console.log("ad is closing!")
		@setState
			adShowing: false
	render: ->
		<div className="ReactContent">
			<Header adChangeStatus={@handleAdChangeStatus}/>
			<MainContent adShowing={@state.adShowing} />
		</div>


UI = 
	init: ->
		ReactDOM.render <App />, document.getElementsByTagName("body")[0]

$ ->
	UI.init()