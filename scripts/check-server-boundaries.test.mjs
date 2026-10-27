import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';

function sources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? sources(file) : /\.tsx?$/.test(file) ? [file] : [];
  });
}

// Prevent another route from importing the context-dependent barrel on the server.
test('NextUI imports and re-exports have an explicit client boundary', () => {
  const violations = [];
  for (const file of sources('src')) {
    const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    const isClient = source.statements.some((node) =>
      ts.isExpressionStatement(node) && ts.isStringLiteral(node.expression) && node.expression.text === 'use client');
    const importsNextUI = source.statements.some((node) =>
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text === '@nextui-org/react');
    if (importsNextUI && !isClient) violations.push(file);
  }
  assert.deepEqual(violations, [], 'Import NextUI through components/ui/nextui in server modules');
});

// Next 16 no longer supports synchronous params/searchParams in page props.
test('page route props use Promise types', () => {
  const violations = [];
  for (const file of sources('src/app').filter((file) => file.endsWith('/page.tsx'))) {
    const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    for (const node of source.statements.filter(ts.isFunctionDeclaration)) {
      for (const parameter of node.parameters) {
        if (!parameter.type || !ts.isTypeLiteralNode(parameter.type)) continue;
        for (const member of parameter.type.members) {
          if (!member.name || !['params', 'searchParams'].includes(member.name.getText(source))) continue;
          if (!member.type || !ts.isTypeReferenceNode(member.type) || member.type.typeName.getText(source) !== 'Promise') {
            violations.push(`${file}: ${node.name?.text}`);
          }
        }
      }
    }
  }
  assert.deepEqual(violations, []);
});

test('server pages do not pass component functions through the as prop', () => {
  const violations = [];
  for (const file of sources('src/app').filter((file) => file.endsWith('/page.tsx'))) {
    const text = readFileSync(file, 'utf8');
    if (/^\s*['"]use client['"]/.test(text)) continue;
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isJsxAttribute(node) && node.name.getText(source) === 'as' &&
          node.initializer && ts.isJsxExpression(node.initializer) &&
          node.initializer.expression && ts.isIdentifier(node.initializer.expression)) {
        violations.push(file);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.deepEqual(violations, [], 'Resolve component-valued as props inside a client wrapper');
});
