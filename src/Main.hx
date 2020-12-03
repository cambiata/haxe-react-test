import redux.Reducer;
import redux.IReducer;
import js.Browser;
import react.ReactDOM;
import react.ReactComponent;
import react.ReactMacro.jsx;
import react.ReactUtil.copy;
import router.Link;
import router.ReactRouter;
import router.RouteComponentProps;
import redux.Store;
import redux.react.Provider;
import redux.StoreBuilder.*;
import redux.react.IConnectedComponent;
import redux.Redux;

using Std;

typedef NamesState = {
	names:Array<String>,
}

enum NamesAction {
	Same;
	Add(name:String);
}

class NamesModel implements IReducer<NamesAction, NamesState> {
	public function new() {}

	public var initState:NamesState = {names: ['Adam', 'Eve']};

	public function reduce(state:NamesState, action:NamesAction):NamesState {
		return switch action {
			case Same:
				copy(state, {names: state.names});
			case Add(name):
				var newItems = state.names.copy();
				newItems.push(name);
				copy(state, {names: newItems});
		}
	}
}

enum TestEnum {
	TestA;
	TestNum(num:Int);
}

typedef EnumsState = {
	items:Array<TestEnum>,
}

enum EnumsAction {
	Same;
	Add(enumItem:TestEnum);
}

class EnumsModel implements IReducer<EnumsAction, EnumsState> {
	public function new() {}

	public var initState:EnumsState = {items: [TestA, TestNum(123)]};

	public function reduce(state:EnumsState, action:EnumsAction):EnumsState {
		return switch action {
			case Same:
				copy(state, {items: state.items});
			case Add(enumItem):
				var newItems = state.items.copy();
				newItems.push(enumItem);
				copy(state, {items: newItems});
		}
	}
}

typedef ApplicationState = {
	names:NamesState,
	items:EnumsState,
}

class ApplicationStore {
	static public function create():Store<ApplicationState> {
		var namesModel = new NamesModel();
		var enumsModel = new EnumsModel();

		var rootReducer:Reducer<ApplicationState> = Redux.combineReducers({
			names: mapReducer(NamesAction, namesModel),
			items: mapReducer(EnumsAction, enumsModel),
		});
		return createStore(rootReducer, null);
	}
}

class Main {
	public static function main() {
		var store = ApplicationStore.create();
		var history = ReactRouter.browserHistory;
		var app = ReactDOM.render(jsx('			
		<Provider store=$store>
			<Router history=$history>
			 	<Route path="/" component=$pageWrapper>
					<IndexRoute component=${IndexView} />
					<Route path="about" component=${x -> jsx('<h1>About</h1>')}/>
				</Route>
			</Router>
		</Provider>
		'), Browser.document.querySelector('main'));

		haxe.Timer.delay(() -> {
			store.dispatch(NamesAction.Add('Holger'));
			store.dispatch(EnumsAction.Add(TestNum(234)));
		}, 2000);
	}

	static function pageWrapper(props:RouteComponentProps) {
		return jsx('
			<div>				
				<nav>
					<Link to="/">Index</Link> | <Link to="/about">About</Link>
				</nav>
				${props.children}
			</div>
		');
	}
}

typedef IndexState = {
	names:Array<String>,
	enums:Array<TestEnum>,
}

class IndexView extends ReactComponentOfPropsAndState<RouteComponentProps, IndexState> implements IConnectedComponent {
	public function new(props) {
		super(props);
	}

	function mapState(state:ApplicationState, props:RouteComponentProps):IndexState {
		return {names: state.names.names, enums:state.items.items};
	}

	override function render() {		
		return jsx('<div>		
			<h1>IndexView</h1>		
			<p>state:${this.state.string()}</p>
		</div>');
	}
}
