import {useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

// React 문법 | 컴포넌트 [사용자 정의 태그] 생성
function Header(props) {
    return (
        <header>
            <h1>
                <a
                    href="/"
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode();
                    }}>
                    {props.title}
                </a>
            </h1>
        </header>
    );
}

function Nav(props) {
    const lis = [];
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(
            <li key={t.id}>
                <a
                    id={t.id}
                    href={"read/" + t.id}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode(Number(event.target.id)); // String->Number 형변환
                    }}>
                    {t.title}
                </a>
            </li>
        );
    }
    return (<nav>
        <ol>{lis}</ol>
    </nav>);
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}

function Create(props) {
    return (
        <article>
            <h2>create</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value; // form 내 name="title"의 value값
                    const body = event.target.body.value; // form 내 name="body"의 value값
                    props.onCreate(title, body);
                }}>
                <p>
                    <input type="text" name="title" placeholder="title"></input>
                </p>
                <p>
                    <textarea name="body" placeholder="body"></textarea>
                </p>
                <p>
                    <input type="submit" value="Create"></input>
                </p>
            </form>
        </article>
    );
}

function Update(props) {
    // title, body 값이 변경되도록 props staging
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    return (
        <article>
            <h2>update</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value; // form 내 name="title"의 value값
                    const body = event.target.body.value; // form 내 name="body"의 value값
                    props.onUpdate(title, body);
                }}>
                <p>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}></input>
                </p>
                <p>
                    <textarea
                        name="body"
                        placeholder="body"
                        value={body}
                        onChange={(event) => {
                            setBody(event.target.value);
                        }}></textarea>
                </p>
                <p>
                    <input type="submit" value="Update"></input>
                </p>
            </form>
        </article>
    );
}

function Detail2() {
    const [mode, setMode] = useState("Movie Review");
    const [id, setId] = useState(null);

    // 다음 원소의 id값을 4로 지정
    const [nextId, setNextId] = useState(4);

    // topics useState 승격 | create로 title, body의 value가 topics에 4번 이후로 추가되어 화면에 출력
    const [topics, setTopics] = useState([
        {
            id: 1,
            title: "나 하얼삔에 장첸이야",
            body: "이 영화의 속편은 100% 성공이다. 원래 한국영화들 속편은 잘 안되고 속편 나오면 망하는 케이스던데 이번 범죄도시2는 속편 성공함 오랜만에" +
                    " 극장에서 다같이 웃으면서 봄 장이수 개웃기고 ㅋㅋㅋ 이번에도 명장면 + 명대사 많이 나온다 이 영화 꼭 봐라"
        }, {
            id: 2,
            title: "A Popular Film That Deserves Its Popularity",
            body: "If you like hopeful, surprising, never-seen-before characters, you will enjoy " +
                    "this amusing story of a family of prisoners victimized by the system and a Bib" +
                    "le thumping pig.Robbins and Freeman, and everybody else, gives perfect perform" +
                    "ances for their characters.Their actions and body languages are perfect for th" +
                    "is story and movie."
        }, {
            id: 3,
            title: " 누가 5야 ?",
            body: " 통쾌함을 마블에서 못보고 여기서 보네요. 스토리도 깔끔해서 몰입 하나도 안끊깁니다 웃긴 요소가 기대벽이 있었음에도 꽤 있어요 개인적으로 조" +
                    "금 더 줘패고 싶었네요"
        }
    ]);

    let content = null;
    let contextControll = null;

    /* props : 컴포넌트 외부에서 사용하는 입력값
        * state : 컴포넌트 내부에서 사용하는 입력값
        * 이벤트를 prop로 생성해 form 값 변경 시 props를 state로 전환 */

    if (mode === "Movie Review") {
        content = <Article title="Welcome" body="Hello, WEB"></Article>;
    } else if (mode === "READ") {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        // 각 id에 해당하는 글(read mode)을 눌렀을 경우에만 update, delete 링크 로드 <li> 태그를 따로 변수로 선언해 해당
        // 경우에 호출
        content = <Article title={title} body={body}></Article>;
        contextControll = (
            <> < li > <a
                href={"/update" + id}
                onClick={(event) => {
                    event.preventDefault();
                    setMode("UPDATE");
                }}>
                <button>Update</button>
            </a>
        </li>

        <li>
            <input
                type="button"
                value="Delete"
                onClick={() => {
                    const newTopics = [];
                    for (let i = 0; i < topics.length; i++) {
                        if (topics[i].id !== id) {
                            newTopics.push(topics[i]);
                        }
                    }
                    setTopics(newTopics); // 비어있는 배열을 리스트에 추가해 삭제된 것 처럼 표시
                    setMode("Movie Review");
                }}></input>
        </li>
    </>
        ); // <> update, delete | 한 변수는 한 태그만 선언 가능. 여러 태그를 넣을 때 groping하는 빈 태그
    } else if (mode === "CREATE") {
        content = (
            <Create
                onCreate={(_title, _body) => {
                    const newTopic = {
                        id: nextId,
                        title: _title,
                        body: _body
                    };
                    const newTopics = [...topics]; // 오리지널 topics 복제
                    newTopics.push(newTopic); // 복제한 topics 변경
                    setTopics(newTopics); // 변경한 topics를 set (state)

                    // 여러 글 추가
                    setMode("READ"); // 읽기모드로 변경
                    setId(nextId); // 추가한 글 id를 nextid로 변경
                    setNextId(nextId + 1); // 다음에 추가할 글
                }}></Create>
        );
    } else if (mode === "UPDATE") {
        let title,
            body = null;

        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = (
            <Update
                title={title}
                body={body}
                onUpdate={(title, body) => {
                    const newTopics = [...topics];
                    const updatedTopic = {
                        id: id,
                        title: title,
                        body: body
                    };
                    for (let i = 0; i < newTopics.length; i++) {
                        if (newTopics[i].id === id) {
                            newTopics[i] = updatedTopic;
                            break;
                        }
                    }
                    setTopics(newTopics);
                    setMode("READ");
                }}></Update>
        );
    }

    return (
        <div>
            <Header
                title="Movie Review"
                onChangeMode={() => {
                    setMode("Movie Review");
                }}></Header>
            <Nav
                topics={topics}
                onChangeMode={(_id) => {
                    setMode("READ");
                    setId(_id);
                }}></Nav>
            {content}

            <ul>
                <li>
                    <a
                        href="/create"
                        onClick={(event) => {
                            event.preventDefault(); // href를 넣었지만 url이 변경되지 않고 한 페이지 내에서 기능이 변경되도록 처리
                            setMode("CREATE");
                        }}>
                        <button>Create</button>
                    </a>
                </li>
                {contextControll}
            </ul>
            <Link to={`/`}>HOME</Link>
        </div>
    );
}

export default Detail2;
