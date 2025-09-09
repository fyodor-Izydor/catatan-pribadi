'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var auth_1 = require("firebase/auth");
var react_1 = require("react");
var firebase_1 = require("../lib/firebase");
var firestore_1 = require("firebase/firestore");
function DashboardPage() {
    var _this = this;
    var _a = react_1.useState([]), notes = _a[0], setNotes = _a[1];
    var _b = react_1.useState(''), newNote = _b[0], setNewNote = _b[1];
    var _c = react_1.useState(null), editingId = _c[0], setEditingId = _c[1];
    react_1.useEffect(function () {
        var unsub = firestore_1.onSnapshot(firestore_1.collection(firebase_1.db, 'notes'), function (snapshot) {
            var data = snapshot.docs.map(function (doc) { return ({
                id: doc.id,
                content: doc.data().content
            }); });
            setNotes(data);
        });
        var auth = auth_1.getAuth();
        var user = auth.currentUser;
        if (user) {
            setUserEmail(user.displayName || user.email || "");
        }
        return function () { return unsub(); };
    }, []);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (newNote.trim() === '')
                        return [2 /*return*/];
                    if (!editingId) return [3 /*break*/, 2];
                    return [4 /*yield*/, firestore_1.updateDoc(firestore_1.doc(firebase_1.db, 'notes', editingId), { content: newNote })];
                case 1:
                    _a.sent();
                    setEditingId(null);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, firestore_1.addDoc(firestore_1.collection(firebase_1.db, 'notes'), { content: newNote })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    setNewNote('');
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (id, content) {
        setNewNote(content);
        setEditingId(id);
    };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firestore_1.deleteDoc(firestore_1.doc(firebase_1.db, 'notes', id))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "min-h-screen bg-gray-100 py-10 px-4" },
        React.createElement("div", { className: "max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6" },
            React.createElement("h1", { className: "text-3xl font-bold text-center text-blue-600" }, "\uD83D\uDCD2 Catatan Pribadi"),
            React.createElement("form", { onSubmit: handleSubmit, className: "flex gap-2" },
                React.createElement("input", { type: "text", placeholder: "Tulis catatan...", className: "flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400", value: newNote, onChange: function (e) { return setNewNote(e.target.value); } }),
                React.createElement("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition" }, editingId ? 'Update' : 'Tambah')),
            React.createElement("ul", { className: "space-y-3" }, notes.map(function (note) { return (React.createElement("li", { key: note.id, className: "flex justify-between items-center bg-gray-50 border border-gray-200 px-4 py-2 rounded-md shadow-sm" },
                React.createElement("span", { className: "text-gray-800" }, note.content),
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("button", { onClick: function () { return handleEdit(note.id, note.content); }, className: "text-sm text-yellow-600 hover:text-yellow-800" }, "Edit"),
                    React.createElement("button", { onClick: function () { return handleDelete(note.id); }, className: "text-sm text-red-600 hover:text-red-800" }, "Hapus")))); })))));
}
exports["default"] = DashboardPage;
function setUserEmail(arg0) {
    throw new Error('Function not implemented.');
}
